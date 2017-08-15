/**
 * Created by Administrator on 2017/3/6.
 */
let obj = {
    success: {
        code: 200,
        msg: "成功"
    },
    failure: {
        code: 1,
        msg: "服务器繁忙"
    },
    login: {
        code: 1001,
        msg: "账号不存在或密码错误"
    },
    auth: {
        code: 403,
        msg: "尚未登录"
    },
    path: {
        code: 404,
        msg: "接口不存在"
    }
};
module.exports = obj;