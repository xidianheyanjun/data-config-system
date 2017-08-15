/**
 * Created by Administrator on 2017/1/19.
 */
"use strict"

let Promise = require("promise");

let sqlObj = require("../sql/access");
let responseCode = require("../../../util/response-code");

class access {
    constructor(option) {
    }

    /*
     登陆
     */
    login() {
        let self = this;
        let body = self["req"]["body"];
        let acc = body["acc"];
        let psw = body["psw"];
        self.dao.prepareQuery({
            sql: sqlObj["queryUser"],
            params: [acc, psw]
        }).then(function (results) {
            console.log(results);
            if (results.length == 0) {
                self["resolver"].json({
                    code: responseCode["login"]["code"],
                    msg: responseCode["login"]["msg"]
                });
                return false;
            }
            self.req.session.user = results[0];
            self["resolver"].json({
                code: responseCode["success"]["code"],
                msg: responseCode["success"]["msg"],
                data: results[0]
            });
        }, function (err) {
            console.log(err);
            self["resolver"].json({
                code: responseCode["failure"]["code"],
                msg: responseCode["failure"]["msg"]
            });
        });
    }

    /*
     退出
     */
    logout() {
        let session = this.req.session;
        session["user"] = null;
        this["resolver"].json({
            code: responseCode["success"]["code"],
            msg: responseCode["success"]["msg"]
        });
    }
}

module.exports = access;