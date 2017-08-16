<template>
  <div>
    <div class="left-menu">
      <left-menu></left-menu>
    </div>
    <div class="body">
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
      kjhkJHSKjsahh<br>
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
        manageMenu: [{
          id: "-1",
          name: "数据源配置",
          component: "data-source-config"
        }, {
          id: "-2",
          name: "菜单配置",
          component: "menu-config"
        }],
        leftMenuSelected: "1",
        leftMenu: []
      };
    },
    mounted () {
      let self = this;
    },
    methods: {
      generateManageLeftMenu(){
        let self = this;
        let leftMenu = [];
        for (let count = 0; count < self.manageMenu.length; ++count) {
          leftMenu.push(self.manageMenu[count]);
        }
        self.leftMenu = leftMenu;
      },
      generateConfigLeftMenu(){
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
      clickTopMenu(menu){
        let self = this;
        for (let count = 0; count < self.topMenu.length; ++count) {
          self.topMenu[count].isActive = self.topMenu[count].code == menu.code;
        }

        // 生成左侧菜单树
        switch (menu.code) {
          case "manage":
            self.generateManageLeftMenu();
            break;
          case "config":
          default:
            self.generateConfigLeftMenu();
            break;
        }

        if (self.leftMenu.length > 0) {
          self.clickLeftMenu(self.leftMenu[0]);
        }
      },
      clickLeftMenu(menu){
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
