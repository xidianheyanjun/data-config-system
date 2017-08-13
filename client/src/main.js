// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'es6-promise/auto';
import VueResouse from 'vue-resource';
import store from './vuex/store';
import env from './env';

Vue.use(VueResouse);
Vue.http.options.credentials = true;
Vue.http.options.emulateJSON = true;

// 扩展交互请求
// option.url:请求的地址
// option.params:上送的参数
// option.success:成功回调
// option.error:失败回调
Vue.prototype.$sendRequest = (option) => {
  return Vue.http.post(option.url, option.params).then(function (data) {
    console.log(data);
    let body = env.mode != "dev" ? data.body : JSON.parse(data.body);
    option.success && option.success(body);
  }, function (err) {
    console.log(err);
    option.error && option.error(err);
  }).catch(function (err) {
    console.log(err);
    option.error && option.error(err);
  });
};

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  template: '<App/>',
  components: { App }
})
