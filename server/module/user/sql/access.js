/**
 * Created by Administrator on 2017/3/6.
 */
let sqls = {};

sqls["queryUserByAcc"] = `
    select id from t_user where acc = ?;
`;

sqls["queryUser"] = `
    select id, acc from t_user where acc = ? and pwd = password(?);
`;

sqls["insertUser"] = `
    insert into t_user(acc, pwd, phone_or_mail, create_time, status)
    values(?, password(?), ?, now(), 0);
`;

sqls["resetPwd"] = `
    update t_user t
    set t.pwd = password(?),
    update_time = now()
    where t.id = ?;
`;

module.exports = sqls;