<template>
  <div>
    <el-menu :default-active="leftMenuSelected" @select="clickLeftMenu" theme="dark">
      <el-menu-item index="/home/index">首页</el-menu-item>
      <el-submenu index="1">
        <template slot="title">数据配置</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
      </el-submenu>
      <el-menu-item index="/config/ds">数据源配置</el-menu-item>
      <el-menu-item index="/config/menu">菜单配置</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import env from "@/env";
  import {mapGetters, mapActions} from 'vuex';
  export default {
    components: {},
    data(){
      return {
        leftMenuSelected: "1",
        leftMenu: []
      };
    },
    mounted () {
      let self = this;
    },
    methods: {
      clickLeftMenu(index){
        console.log(index);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
