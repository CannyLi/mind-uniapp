import App from './App';
import store from './stores';

// // #ifndef VUE3
// import Vue from 'vue'
// import './uni.promisify.adaptor'
// Vue.config.productionTip = false
// App.mpType = 'app'
// const app = new Vue({
//   ...App
// })
// app.$mount()
// // #endif

// // #ifdef VUE3
// import { createSSRApp } from 'vue';
// import Vuex from 'vuex';
// export function createApp() {
//   const app = createSSRApp(App)
//   return {
//     app
//   }
// }
// // #endif

// Vue 3
import { createSSRApp } from 'vue';
import Vuex from 'vuex';

export function createApp() {
  const app = createSSRApp(App);
  app.use(store); // 确保store被添加为插件
  app.use(Vuex); // 注册Vuex插件
  return { app };
}