<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm.acc" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm.psw" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="login" :loading="logining">登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import env from "@/env";
  import {mapGetters, mapActions} from 'vuex';
  export default {
    components: {},
    data(){
      return {
        logining: false,
        ruleForm: {
          acc: 'admin',
          psw: '123456'
        },
        rules: {
          acc: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          psw: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      };
    },
    mounted () {
    },
    methods: {
      login(){
        let self = this;
        self.$refs.ruleForm.validate(function (valid) {
          if (!valid) {
            return false;
          }

          self.logining = true;
          self.$sendRequest({
            url: env.url.login,
            params: {
              acc: self.ruleForm.acc,
              psw: self.ruleForm.psw
            },
            success: function (data) {
              self.logining = false;

              self.$store.dispatch('userLogin', {
                id: data.data.id,
                acc: data.data.acc
              });

              self.$router.push({path: '/home/index'});
            },
            error: function (err) {
              self.logining = false;
            }
          });
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .remember {
    margin: 0px 0px 35px 0px;
  }
</style>
