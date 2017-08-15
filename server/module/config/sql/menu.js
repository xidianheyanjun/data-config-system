/**
 * Created by Administrator on 2017/3/6.
 */
let sqls = {};

sqls["queryMenu"] = `
    select id, dt_id, name
    from t_menu
    where status = 0
    order by id;
`;

module.exports = sqls;