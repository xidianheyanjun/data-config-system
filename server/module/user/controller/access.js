/**
 * Created by Administrator on 2017/1/19.
 */
"use strict"

let Promise = require("promise");

let sqlObj = require("../sql/access");

class access {
    constructor(option) {
    }

    _validUserExisted(option) {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.dao.prepareQuery({
                sql: sqlObj["queryUserByAcc"],
                params: [option["acc"]]
            }).then(function (results) {
                resolve(results);
            }, function (err) {
                reject(err);
            });
        });
    }

    /*
     注册用户
     */
    register() {
        let self = this;
        let body = self["req"]["body"];
        let acc = body["acc"];
        let pwd = body["pwd"];
        let pom = body["phoneOrMail"];
        self._validUserExisted({
            acc: acc
        }).then(function (data) {
            console.log(data);
            if (data.length > 0) {
                self["resolver"].json({
                    status: 1002,
                    msg: "该用户已经注册"
                });
                return false;
            }

            self.dao.prepareQuery({
                sql: sqlObj["insertUser"],
                params: [acc, pwd, pom]
            }).then(function (results) {
                console.log(results);
                self["resolver"].json({
                    status: 200,
                    msg: "注册用户成功",
                    data: {
                        id: results["insertId"]
                    }
                });
            }, function (err) {
                self["resolver"].json({
                    status: 1,
                    msg: "注册用户失败"
                });
            });
        }, function (err) {
            console.log(err);
            self["resolver"].json({
                status: 1,
                msg: "查询用户失败"
            });
        });
    }

    /*
     校验用户是否已经注册
     */
    valid() {
        let self = this;
        let body = self["req"]["body"];
        let acc = body["acc"];
        self._validUserExisted({
            acc: acc
        }).then(function (data) {
            if (data.length > 0) {
                self["resolver"].json({
                    status: 1003,
                    msg: "该用户已经注册"
                });
                return false;
            }

            self["resolver"].json({
                status: 200,
                msg: "该用户尚未注册"
            });
        }, function (err) {
            self["resolver"].json({
                status: 1,
                msg: "查询用户失败"
            });
        });
    }

    /*
     登陆
     */
    login() {
        let self = this;
        let body = self["req"]["body"];
        let acc = body["acc"];
        let pwd = body["pwd"];
        self.dao.prepareQuery({
            sql: sqlObj["queryUser"],
            params: [acc, pwd]
        }).then(function (results) {
            console.log(results);
            if (results.length == 0) {
                self["resolver"].json({
                    status: 1001,
                    msg: "失败"
                });
                return false;
            }
            self.req.session.user = results[0];
            self["resolver"].json({
                status: 200,
                msg: "成功"
            });
        }, function (err) {
            console.log(err);
            self["resolver"].json({
                status: 1,
                msg: "失败"
            });
        });
    }


    /*
     重置密码
     */
    reset() {
        let self = this;
        let body = self["req"]["body"];
        let pwd = body["pwd"];
        let session = self.req.session;
        let id = session["user"]["id"];
        self.dao.prepareQuery({
            sql: sqlObj["resetPwd"],
            params: [pwd, id]
        }).then(function (results) {
            console.log(results);
            self["resolver"].json({
                status: 200,
                msg: "成功"
            });
        }, function (err) {
            console.log(err);
            self["resolver"].json({
                status: 1,
                msg: "失败"
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
            status: 200,
            msg: "成功"
        });
    }
}

module.exports = access;