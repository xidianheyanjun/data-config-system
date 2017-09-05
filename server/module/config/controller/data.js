/**
 * Created by Administrator on 2017/1/19.
 */
"use strict"

let Promise = require("promise");
let uuidV1 = require('uuid/v1');

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
                    } else {
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

    listConfigColumnAndData() {
        let self = this;
        let session = this.req.session;
        let body = self["req"]["body"];
        let dtId = parseInt(body["dtId"]);
        let dataId = parseInt(body["dataId"]) || 0;
        if (!dtId) {
            self["resolver"].json({
                code: responseCode["paramError"]["code"],
                msg: responseCode["paramError"]["msg"]
            });
            return false;
        }

        let promise = new Promise(function (resolve, reject) {
            self.dao.prepareQuery({
                sql: sqlObj["listMeta"],
                params: [dtId, session["user"]["id"]]
            }).then(function (results) {
                console.log("listConfigColumnAndData|listMeta", results);
                if (results.length == 0) {
                    self["resolver"].json({
                        code: responseCode["success"]["code"],
                        msg: responseCode["success"]["msg"]
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
        promise.then(function (data) {
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
                if (data[count].dataType == "auto" || data[count].dataType == "uuid") {
                    whereClouse.push(data[count].code + " = ?");
                    whereParam.push(dataId);
                }
            }
            let sql = "select " + queryColumn.join(",") + " from " + tableName;
            sql += whereClouse.length > 0 ? " where " + whereClouse.join(" and ") : "";
            self.dao.prepareQuery({
                cfg: dbConfig,
                sql: sql,
                params: whereParam
            }).then(function (info) {
                console.log(info);
                let retColumns = [];
                for (let m = 0; m < data.length; ++m) {
                    retColumns.push({
                        id: data[m]["dcId"],
                        code: data[m]["code"],
                        name: data[m]["name"],
                        dataType: data[m]["dataType"]
                    });
                }
                self["resolver"].json({
                    code: responseCode["success"]["code"],
                    msg: responseCode["success"]["msg"],
                    data: {
                        columns: retColumns,
                        data: info[0] || {}
                    }
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

    save() {
        let self = this;
        let session = this.req.session;
        let body = self["req"]["body"];
        let dtId = parseInt(body["dtId"]);
        let dataId = body["dataId"];
        let sendData = JSON.parse(body["sendData"]);
        let type = body["type"];
        if (!dtId) {
            self["resolver"].json({
                code: responseCode["paramError"]["code"],
                msg: responseCode["paramError"]["msg"]
            });
            return false;
        }

        let promise = new Promise(function (resolve, reject) {
            self.dao.prepareQuery({
                sql: sqlObj["listMeta"],
                params: [dtId, session["user"]["id"]]
            }).then(function (results) {
                console.log("save|listMeta", results);
                if (results.length == 0) {
                    self["resolver"].json({
                        code: responseCode["success"]["code"],
                        msg: responseCode["success"]["msg"]
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
        promise.then(function (data) {
            let dbConfig = {
                "id": data[0].id,
                "host": data[0].ip,
                "port": data[0].port,
                "user": data[0].acc,
                "password": data[0].psw,
                "database": data[0].dbName
            };
            let tableName = data[0].tableName;
            let sql = "";
            let params = [];
            if (type == "update") {
                let setColumn = [];
                let keyCode = "";
                for (let count = 0; count < data.length; ++count) {
                    if (data[count].dataType == "auto" || data[count].dataType == "uuid") {
                        keyCode = data[count].code;
                        continue;
                    } else if (data[count].dataType == "update_user") {
                        setColumn.push(data[count].code + " = ?");
                        params.push(session["user"]["id"]);
                        continue;
                    } else if (data[count].dataType == "update_time") {
                        setColumn.push(data[count].code + " = now()");
                        continue;
                    }

                    if (sendData.hasOwnProperty(data[count].code)) {
                        setColumn.push(data[count].code + " = ?");
                        params.push(sendData[data[count].code]);
                    }
                }

                sql = "update " + tableName + " set " + setColumn.join(",") + " where " + keyCode + " = ?";
                params.push(dataId);
            } else if (type == "create") {
                let insertColumn = [];
                let valueColumn = [];
                let createTimeCode = "";
                for (let count = 0; count < data.length; ++count) {
                    if (data[count].dataType == "auto") {
                        continue;
                    } else if (data[count].dataType == "uuid") {
                        insertColumn.push(data[count].code);
                        params.push(uuidV1().replace(/-/g, ""));
                    } else if (data[count].dataType == "create_user") {
                        insertColumn.push(data[count].code);
                        params.push(session["user"]["id"]);
                    } else if (data[count].dataType == "create_time") {
                        createTimeCode = data[count].code;
                    } else {
                        if (sendData.hasOwnProperty(data[count].code)) {
                            insertColumn.push(data[count].code);
                            params.push(sendData[data[count].code]);
                        }
                    }
                }

                for (let m = 0; m < insertColumn.length; ++m) {
                    valueColumn.push("?");
                }
                sql = "insert into " + tableName + "(" + insertColumn.join(",") + (createTimeCode ? "," + createTimeCode : "") + ") values(" + valueColumn.join(",") + (createTimeCode ? ",now()" : "") + ")";
            }
            self.dao.prepareQuery({
                cfg: dbConfig,
                sql: sql,
                params: params
            }).then(function (info) {
                console.log(info);
                self["resolver"].json({
                    code: responseCode["success"]["code"],
                    msg: responseCode["success"]["msg"],
                    data: {
                        id: info["insertId"]
                    }
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

    deleteData() {
        let self = this;
        let session = this.req.session;
        let body = self["req"]["body"];
        let dtId = parseInt(body["dtId"]);
        let dataParam = JSON.parse(body["ids"]) || [];
        let ids = [];
        if (!dtId) {
            self["resolver"].json({
                code: responseCode["paramError"]["code"],
                msg: responseCode["paramError"]["msg"]
            });
            return false;
        }
        let promise = new Promise(function (resolve, reject) {
            self.dao.prepareQuery({
                sql: sqlObj["listMeta"],
                params: [dtId, session["user"]["id"]]
            }).then(function (results) {
                console.log("deleteData|listMeta", results);
                if (results.length == 0) {
                    self["resolver"].json({
                        code: responseCode["success"]["code"],
                        msg: responseCode["success"]["msg"]
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
        promise.then(function (data) {
            let dbConfig = {
                "id": data[0].id,
                "host": data[0].ip,
                "port": data[0].port,
                "user": data[0].acc,
                "password": data[0].psw,
                "database": data[0].dbName
            };
            let tableName = data[0].tableName;
            let primaryKeyCode = "";
            for (let count = 0; count < data.length; ++count) {
                if (data[count].dataType == "auto" || data[count].dataType == "uuid") {
                    primaryKeyCode = data[count].code;
                    break;
                }
            }
            for (let m = 0; m < dataParam.length; ++m) {
                ids.push(dataParam[m][primaryKeyCode]);
            }
            let sql = "delete from " + tableName + " where " + primaryKeyCode + " in (" + ids.join(",") + ")";
            self.dao.prepareQuery({
                cfg: dbConfig,
                sql: sql,
                params: []
            }).then(function (info) {
                self["resolver"].json({
                    code: responseCode["success"]["code"],
                    msg: responseCode["success"]["msg"]
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