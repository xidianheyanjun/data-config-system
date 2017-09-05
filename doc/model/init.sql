insert into t_user(id, acc, psw, status)
values(1, "admin", password("123456"), 0);

insert into t_data_source(id, ip, port, acc, psw, db_name, create_user, create_time, status)
values(1, "localhost", "3306", "root", "root", "dcs", 1, now(), 0);

insert into t_db_table(id, ds_id, table_name, create_user, create_time, status)
values(1, 1, "t_data_source", 1, now(), 0),
(2, 1, "t_db_table", 1, now(), 0),
(3, 1, "t_db_column", 1, now(), 0),
(4, 1, "t_menu", 1, now(), 0);

insert into t_menu(dt_id, name, create_user, create_time, status)
values(1, "数据源配置", 1, now(), 0),
(2, "数据表配置", 1, now(), 0),
(3, "数据表字段配置", 1, now(), 0),
(4, "菜单配置", 1, now(), 0);

insert into t_db_column(dt_id, code, name, data_type, create_user, create_time, status)
values(1, "id", "id", "auto", 1, now(), 0),
(1, "ip", "ip", "string", 1, now(), 0),
(1, "port", "port", "string", 1, now(), 0),
(1, "acc", "数据库账号", "string", 1, now(), 0),
(1, "psw", "数据库密码", "string", 1, now(), 0),
(1, "db_name", "数据库名称", "string", 1, now(), 0),
(1, "create_user", "创建人", "create_user", 1, now(), 0),
(1, "create_time", "创建时间", "create_time", 1, now(), 0),
(1, "update_user", "修改人", "update_user", 1, now(), 0),
(1, "update_time", "修改时间", "update_time", 1, now(), 0),
(1, "status", "状态", "int", 1, now(), 0);

insert into t_db_column(dt_id, code, name, data_type, create_user, create_time, status)
values(2, "id", "id", "auto", 1, now(), 0),
(2, "ds_id", "数据源标识", "int", 1, now(), 0),
(2, "table_name", "数据库表名", "string", 1, now(), 0),
(2, "create_user", "创建人", "create_user", 1, now(), 0),
(2, "create_time", "创建时间", "create_time", 1, now(), 0),
(2, "update_user", "修改人", "update_user", 1, now(), 0),
(2, "update_time", "修改时间", "update_time", 1, now(), 0),
(2, "status", "状态", "int", 1, now(), 0);

insert into t_db_column(dt_id, code, name, data_type, create_user, create_time, status)
values(3, "id", "id", "auto", 1, now(), 0),
(3, "dt_id", "数据库表标识", "int", 1, now(), 0),
(3, "code", "字段代码", "string", 1, now(), 0),
(3, "name", "字段名称", "string", 1, now(), 0),
(3, "data_type", "字段类型", "string", 1, now(), 0),
(3, "create_user", "创建人", "create_user", 1, now(), 0),
(3, "create_time", "创建时间", "create_time", 1, now(), 0),
(3, "update_user", "修改人", "update_user", 1, now(), 0),
(3, "update_time", "修改时间", "update_time", 1, now(), 0),
(3, "status", "状态", "int", 1, now(), 0);

insert into t_db_column(dt_id, code, name, data_type, create_user, create_time, status)
values(4, "id", "id", "auto", 1, now(), 0),
(4, "dt_id", "数据库表标识", "int", 1, now(), 0),
(4, "name", "字段名称", "string", 1, now(), 0),
(4, "create_user", "创建人", "create_user", 1, now(), 0),
(4, "create_time", "创建时间", "create_time", 1, now(), 0),
(4, "update_user", "修改人", "update_user", 1, now(), 0),
(4, "update_time", "修改时间", "update_time", 1, now(), 0),
(4, "status", "状态", "int", 1, now(), 0);

insert t_test(name, age)
values("aaa", "111"),
("bbb", "112");