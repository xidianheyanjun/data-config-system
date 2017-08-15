<template>
  <div id="app">
    <el-row class="header">
      <el-col :span="6" class="logo"></el-col>
      <el-col :span="14"></el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover" @command="handleCommand">
          <span class="el-dropdown-link userinfo-inner">{{user.acc}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>

    <router-view></router-view>
  </div>
</template>

<script>
  import env from "@/env";
  import {mapGetters, mapActions} from 'vuex';
  export default {
    components: {},
    computed: mapGetters([
      "user"
    ]),
    data(){
      return {};
    },
    methods: {
      handleCommand(command){
        this[command]();
      },
      logout(){
        let self = this;
        self.$sendRequest({
          url: env.url.logout,
          params: {},
          success: function (data) {
            if (data.code == 200) {
              window.localStorage.removeItem("user");
              self.$router.push({path: '/login/index'});
            }
          },
          error: function (err) {
          }
        });
      }
    }
  }
</script>

<style>
  /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
   */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  .header {
    height: 80px;
    background-color: #008bd2;
  }

  .logo {
    background: url("./assets/image/vivo-logo-white.png") center center no-repeat;
    background-size: contain;
    height: 80px;
    padding-left: 100px;
    color: #ffffff;
    font-size: 22px;
  }

  .top-menu {
    height: 80px;
    line-height: 80px;
    display: inline-block;
    padding: 0 10px;
    margin: 0 10px;
    color: #ffffff;
    cursor: pointer;
  }

  .top-menu.active {
    background-color: #00ccee;
  }

  .top-menu:hover {
    background-color: #00ccee;
  }

  .userinfo {
    padding-right: 35px;
    height: 80px;
    line-height: 80px;
  }

  .userinfo-inner {
    cursor: pointer;
    color: #fff;
  }
</style>
