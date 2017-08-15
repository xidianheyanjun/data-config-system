/**
 * Created by Administrator on 2017/3/6.
 */
let sqls = {};

sqls["queryUser"] = `
    select id, acc from t_user where acc = ? and psw = password(?);
`;

module.exports = sqls;