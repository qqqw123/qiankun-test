import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'
import { router } from "./router"

Vue.use(ElementUI);

import {
  registerMicroApps,
  start,
} from "qiankun";
import { Microconfig } from "./registerMicroAppsConfig";


// 注册微应用
registerMicroApps(Microconfig, {
  // qiankun 生命周期钩子 - 微应用加载前
  beforeLoad: (app) => {
    console.log("before load", app.name);
    return Promise.resolve();
  },
  // qiankun 生命周期钩子 - 微应用挂载后
  afterMount: (app) => {
    console.log("after mount", app.name);
    return Promise.resolve();
  },
});

// 启动 qiankun

// 添加全局异常捕获
// addGlobalUncaughtErrorHandler((handler) => {
//   console.log("异常捕获", handler);
// });
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


/**
 *  此处设置{ sandbox: { strictStyleIsolation: true } } 
 *  是为了开启沙盒模式，能够做到主应用和微应用之间的样式隔离(目前只在vue项目中实现)
 */
start({ sandbox: { strictStyleIsolation: true } });