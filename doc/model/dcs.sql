/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2017/8/14 10:19:44                           */
/*==============================================================*/


drop table if exists t_data_source;

drop table if exists t_db_column;

drop table if exists t_db_table;

drop table if exists t_menu;

drop table if exists t_user;

/*==============================================================*/
/* Table: t_data_source                                         */
/*==============================================================*/
create table t_data_source
(
   id                   integer not null auto_increment,
   ip                   varchar(16),
   port                 varchar(8),
   acc                  varchar(128),
   psw                  varchar(128),
   db_name              varchar(128),
   create_user          integer,
   create_time          datetime,
   update_user          integer,
   update_time          datetime,
   status               tinyint(4),
   primary key (id)
);

alter table t_data_source comment '数据源表';

/*==============================================================*/
/* Table: t_db_column                                           */
/*==============================================================*/
create table t_db_column
(
   id                   integer not null auto_increment,
   dt_id                integer,
   code                 varchar(128),
   name                 varchar(128),
   data_type            varchar(16),
   default_value        varchar(128),
   create_user          integer,
   create_time          datetime,
   update_user          integer,
   update_time          datetime,
   status               tinyint(4),
   primary key (id)
);

alter table t_db_column comment '数据库表字段信息表';

/*==============================================================*/
/* Table: t_db_table                                            */
/*==============================================================*/
create table t_db_table
(
   id                   integer not null auto_increment,
   ds_id                integer,
   table_name           varchar(128),
   create_user          integer,
   create_time          datetime,
   update_user          integer,
   update_time          datetime,
   status               tinyint(4),
   primary key (id)
);

alter table t_db_table comment '数据库表信息表';

/*==============================================================*/
/* Table: t_menu                                                */
/*==============================================================*/
create table t_menu
(
   id                   integer not null auto_increment,
   dt_id                integer,
   name                 varchar(128),
   create_user          integer,
   create_time          datetime,
   update_user          integer,
   update_time          datetime,
   status               tinyint(4),
   primary key (id)
);

alter table t_menu comment '菜单表';

/*==============================================================*/
/* Table: t_user                                                */
/*==============================================================*/
create table t_user
(
   id                   integer not null auto_increment,
   acc                  varchar(128),
   psw                  varchar(128),
   status               tinyint(4),
   primary key (id)
);

alter table t_user comment '用户表';

