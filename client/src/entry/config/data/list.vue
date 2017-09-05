<template>
  <div>
    <div class="left-menu">
      <left-menu></left-menu>
    </div>
    <div class="body">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item v-for="column in columns" :key="column.id" :label="column.name">
          <el-input v-model="model[column['code']]"></el-input>
        </el-form-item>
      </el-form>

      <el-row>
        <el-button type="primary" @click="preQuery()">查询</el-button>
        <el-button @click="create">新增</el-button>
        <el-button @click="view">查看</el-button>
        <el-button @click="update">修改</el-button>
        <el-button @click="remove">删除</el-button>
      </el-row>
      <el-table ref="table" :data="tableData" border stripe tooltip-effect="dark" style="width: 100%; margin: 2% 0;"
                @selection-change="handleSelectionChange" @row-click="rowCLickHandle">
        <el-table-column type="selection"></el-table-column>
        <el-table-column v-for="column in columns" :key="column.id" :prop="column.code"
                         :label="column.name"></el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-size="page.size"
        layout="total, prev, pager, next, jumper"
        :page-count="page.total">
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
        dtId: 0,
        columns: [],
        model: {},
        tableData: [],
        page: {
          current: 0,
          size: 10,
          total: 0
        },
        multipleSelection: []
      };
    },
    watch: {
      "$route": ["init"]
    },
    mounted () {
      this.init();
    },
    methods: {
      init(){
        this.dtId = this.$route.params["id"];
        // 先根据表配置信息查询顶部查询对应表字段信息
        // 再获取表字段默认值查询表格数据
        let self = this;
        self.$sendRequest({
          url: env.url.listConfigColumn,
          params: {
            dtId: self.dtId
          },
          success: function (data) {
            console.log(data);
            self.columns = data.data;
            for (let count = 0; count < self.columns.length; ++count) {
              self.model[self.columns[count].code] = "";
            }

            self.query(1);
          },
          error: function (err) {
          }
        });
      },
      preQuery(){
        this.page.current = 0;
        this.page.total = 0;
        this.query(1);
      },
      query(pageCurrent){
        let self = this;
        console.log(pageCurrent);
        pageCurrent = pageCurrent || 1;
        if (self.page.current != 0 && (pageCurrent > self.page.total || pageCurrent < 1)) {
          console.log("pageCurrent is gt total page");
          return false;
        }
        self.model.dtId = self.dtId;
        self.model.pageCurrent = pageCurrent;
        self.model.pageSize = self.page.size;
        self.$sendRequest({
          url: env.url.listConfigData,
          params: self.model,
          success: function (data) {
            console.log(data);
            self.tableData = data.data.list;
            self.page.current = pageCurrent;
            self.page.total = data.data.totalPage;
          },
          error: function (err) {
          }
        });
      },
      create(){
        let self = this;
        self.$router.push({
          path: '/config/data/edit',
          query: {
            type: "create",
            dtId: self.dtId
          }
        });
      },
      view(){
        let self = this;
        if (self.multipleSelection.length != 1) {
          self.$message("请选择一条记录");
          return false;
        }

        self.$router.push({
          path: '/config/data/edit',
          query: {
            type: "view",
            dtId: self.dtId,
            dataId: self.multipleSelection[0].id
          }
        });
      },
      update(){
        let self = this;
        if (self.multipleSelection.length != 1) {
          self.$message("请选择一条记录");
          return false;
        }

        self.$router.push({
          path: '/config/data/edit',
          query: {
            type: "update",
            dtId: self.dtId,
            dataId: self.multipleSelection[0].id
          }
        });
      },
      remove(){
        // 根据id删除数据
        let self = this;
        if (self.multipleSelection.length == 0) {
          self.$message("请选择一条记录");
          return false;
        }
        self.$sendRequest({
          url: env.url.deleteData,
          params: {
            dtId: self.dtId,
            ids: JSON.stringify(self.multipleSelection)
          },
          success: function (data) {
            self.$message("删除成功");
            self.query(self.page.current);
          },
          error: function (err) {
          }
        });
      },
      rowCLickHandle(row, event, column){
      },
      handleSelectionChange(val) {
        console.log(val);
        this.multipleSelection = val;
      },
      handleCurrentChange(pageCurrent){
        this.query(pageCurrent);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
