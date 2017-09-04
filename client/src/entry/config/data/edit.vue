<template>
  <div>
    <div class="left-menu">
      <left-menu></left-menu>
    </div>
    <div class="body">
      <el-form :inline="false" class="demo-form-inline">
        <el-form-item v-for="column in columns" :key="column.id" :label="column.name">
          <el-input v-if="type=='create' || type=='update'" v-model="dataObj[column['code']]"></el-input>
          <span v-if="type=='view'">{{dataObj[column['code']]}}</span>
        </el-form-item>
      </el-form>

      <el-row>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-row>
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
        type: "",
        dataId: 0,
        columns: [],
        dataObj: {}
      };
    },
    mounted () {
      let self = this;
      self.dtId = self.$route.query.dtId;
      self.type = self.$route.query.type;
      self.dataId = self.$route.query.dataId || 0;
      console.log(self.$route.query);
      this.init();
    },
    methods: {
      init(){
        let self = this;
        self.$sendRequest({
          url: env.url.listConfigColumnAndData,
          params: {
            dtId: self.dtId,
            dataId: self.dataId
          },
          success: function (data) {
            self.columns = data.data.columns;
            self.dataObj = data.data.data;
          },
          error: function (err) {
          }
        });
      },
      save(){
        let self = this;
        let sendData = {};
        self.$sendRequest({
          url: env.url.saveData,
          params: {
            dtId: self.dtId,
            dataId: self.dataId,
            sendData: self.dataObj
          },
          success: function (data) {
            alert("保存成功");
          },
          error: function (err) {
            console.log("err", err);
          }
        });
      },
      cancel(){
        this.$router.go(-1);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
