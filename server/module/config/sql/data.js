/**
 * Created by Administrator on 2017/3/6.
 */
let sqls = {};

sqls["listMenu"] = `
    select id, dt_id, name
    from t_menu
    where status = 0
    order by id;
`;

sqls["listColumn"] = `
    select id, code, name
    from t_db_column
    where dt_id = ?
    and create_user = ?
    and status = 0
    order by id;
`;

sqls["listMeta"] = `
    select ds.id as id, ds.ip as ip, ds.port as port, ds.acc as acc, ds.psw as psw, ds.db_name as dbName,
    dt.table_name as tableName,
    dc.code as code, dc.data_type as dataType
    from t_data_source ds, t_db_table dt, t_db_column dc
    where dt.id = ?
    and ds.id = dt.ds_id
    and dt.id = dc.dt_id
    and dt.create_user = ?
`;

module.exports = sqls;