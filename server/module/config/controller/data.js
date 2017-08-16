/**
 * Created by Administrator on 2017/1/19.
 */
"use strict"

let Promise = require("promise");

let sqlObj = require("../sql/data");
let responseCode = require("../../../util/response-code");

class access {
    constructor(option) {
    }

    listMenu() {
        let self = this;
        let body = self["req"]["body"];
        self.dao.prepareQuery({
            sql: sqlObj["listMenu"],
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

    listColumn() {
        let self = this;
        let session = this.req.session;
        let body = self["req"]["body"];
        let dtId = parseInt(body["dtId"]);
        if (!dtId) {
            self["resolver"].json({
                code: responseCode["paramError"]["code"],
                msg: responseCode["paramError"]["msg"]
            });
            return false;
        }

        // 获取数据表字段信息
        self.dao.prepareQuery({
            sql: sqlObj["listColumn"],
            params: [dtId, session["user"]["id"]]
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

    listData() {
        let self = this;
        let session = this.req.session;
        let body = self["req"]["body"];
        let dtId = parseInt(body["dtId"]);
        let pageCurrent = parseInt(body["pageCurrent"]) || 1;
        let pageSize = parseInt(body["pageSize"]) || 20;

        // 先关联查询数据源,数据表,数据表字段
        // 拼接sql及参数
        // 查询对应数据库数据并返回结果

        let metaPromise = new Promise(function (resolve, reject) {
            self.dao.prepareQuery({
                sql: sqlObj["listMeta"],
                params: [dtId, session["user"]["id"]]
            }).then(function (results) {
                console.log("listMeta", results);
                if (results.length == 0) {
                    self["resolver"].json({
                        code: responseCode["success"]["code"],
                        msg: responseCode["success"]["msg"],
                        data: {
                            list: [],
                            pageSize: pageSize,
                            pageNo: 1,
                            totalPage: 0
                        }
                    });
                    return false;
                }
                resolve(results);
            }, function (err) {
                console.log(err);
                self["resolver"].json({
                    code: responseCode["failure"]["code"],
                    msg: responseCode["failure"]["msg"]
                });
            });
        });
        metaPromise.then(function (data) {
            let dbConfig = {
                "id": data[0].id,
                "host": data[0].ip,
                "port": data[0].port,
                "user": data[0].acc,
                "password": data[0].psw,
                "database": data[0].dbName
            };
            let tableName = data[0].tableName;
            let queryColumn = [];
            let whereClouse = [];
            let whereParam = [];
            for (let count = 0; count < data.length; ++count) {
                queryColumn.push(data[count].code);
                if (body[data[count].code]) {
                    if (data[count].dataType == "string") {
                        whereClouse.push(data[count].code + " like ?");
                        whereParam.push("%" + body[data[count].code] + "%");
                    } else if (data[count].dataType == "int") {
                        whereClouse.push(data[count].code + " = ?");
                        whereParam.push(parseInt(body[data[count].code]));
                    }
                }
            }
            let sql = "select " + queryColumn.join(",") + " from " + tableName;
            sql += whereClouse.length > 0 ? " where " + whereClouse.join(" and ") : "";
            self.dao.queryForList({
                cfg: dbConfig,
                sql: sql,
                params: whereParam,
                page: {
                    pageSize: pageSize,
                    pageNo: pageCurrent
                }
            }).then(function (pageInfo) {
                console.log(pageInfo);
                self["resolver"].json({
                    code: responseCode["success"]["code"],
                    msg: responseCode["success"]["msg"],
                    data: pageInfo
                });
            }, function (error) {
                console.log(error);
                self["resolver"].json({
                    code: responseCode["failure"]["code"],
                    msg: responseCode["failure"]["msg"]
                });
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