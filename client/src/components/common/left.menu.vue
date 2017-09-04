<template>
  <div>
    <el-menu :default-active="leftMenuSelected" @select="clickLeftMenu" theme="dark">
      <el-menu-item index="/home/index">首页</el-menu-item>
      <el-menu-item v-for="menu in leftMenu" :key="menu.id" :index="'/config/data/list/'+menu.dt_id">{{menu.name}}
      </el-menu-item>
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
      self.queryMenu();
    },
    methods: {
      queryMenu(){
        let self = this;
        self.$sendRequest({
          url: env.url.queryMenu,
          params: {},
          success: function (data) {
            self.leftMenu = data.data;
          },
          error: function (err) {
          }
        });
      },
      clickLeftMenu(index){
        console.log(index);
        this.$router.push({path: index});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
