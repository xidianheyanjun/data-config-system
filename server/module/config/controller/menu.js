/**
 * Created by Administrator on 2017/1/19.
 */
"use strict"

let Promise = require("promise");

let sqlObj = require("../sql/menu");
let responseCode = require("../../../util/response-code");

class access {
    constructor(option) {
    }

    list() {
        let self = this;
        let body = self["req"]["body"];
        self.dao.prepareQuery({
            sql: sqlObj["queryMenu"],
            params: []
        }).then(function (results) {
            console.log(results);
            self["resolver"].json({
                code: responseCode["success"]["code"],
                msg: responseCode["success"]["msg"],
                data: results
            });
        }, function (err) {
            console.log(err);
            self["resolver"].json({
                code: responseCode["failure"]["code"],
                msg: responseCode["failure"]["msg"]
            });
        });
    }
}

module.exports = access;