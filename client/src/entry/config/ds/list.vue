<template>
  <div>
    <div class="left-menu">
      <left-menu></left-menu>
    </div>
    <div class="body">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="ip">
          <el-input v-model="ip" placeholder="如:172.25.122.129"></el-input>
        </el-form-item>
        <el-form-item label="port">
          <el-input v-model="port" placeholder="如:3306"></el-input>
        </el-form-item>
        <el-form-item label="数据库名">
          <el-input v-model="dbName" placeholder="如:dcs"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query(1)" :loading="logining">查询</el-button>
        </el-form-item>
      </el-form>

      <el-row>
        <el-button @click="create">新增</el-button>
        <el-button @click="view">查看</el-button>
        <el-button @click="update">修改</el-button>
        <el-button @click="remove">删除</el-button>
      </el-row>
      <el-table ref="table" :data="tableData" border tooltip-effect="dark" style="width: 100%; margin: 2% 0;"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="ip" label="ip"></el-table-column>
        <el-table-column prop="port" label="port"></el-table-column>
        <el-table-column prop="dbName" label="数据库名"></el-table-column>
        <el-table-column prop="dbAcc" label="账号"></el-table-column>
        <el-table-column prop="dbPsw" label="密码"></el-table-column>
        <el-table-column prop="userAcc" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-size="page.size"
        layout="total, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import env from "@/env";
  import leftMenu from "@/components/common/left.menu";
  import {mapGetters, mapActions} from 'vuex';
  export default {
    components: {
      leftMenu
    },
    data(){
      return {
        logining: false,
        ip: "",
        port: "",
        dbName: "",
        tableData: [],
        page: {
          current: 0,
          size: 20,
          total: 0
        },
        multipleSelection: []
      };
    },
    mounted () {
      this.query(1);
    },
    methods: {
      query(pageCurrent){
        let self = this;
        console.log(pageCurrent);
        pageCurrent = pageCurrent || 1;
        if (self.page.current != 0 && (pageCurrent > self.page.total || pageCurrent < 1)) {
          console.log("pageCurrent is gt total page");
          return false;
        }
        self.$sendRequest({
          url: env.url.listConfigDs,
          params: {
            ip: self.ip,
            port: self.port,
            dbName: self.dbName,
            pageCurrent: pageCurrent,
            pageSize: self.page.size
          },
          success: function (data) {
            console.log(data);
            self.tableData = data.data.list;
            self.page.current = pageCurrent;
          },
          error: function (err) {
          }
        });
      },
      create(){
      },
      view(){
      },
      update(){
      },
      remove(){
      },
      handleSelectionChange(val) {
        console.log(val);
        this.multipleSelection = val;
      },
      handleCurrentChange(val){
        console.log(val);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
