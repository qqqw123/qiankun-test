import Vue from "vue";
import Router from "vue-router"

import "./public-path";
import App from "./App.vue";
import routes from './router'

Vue.use(Router)
Vue.config.productionTip = false;

let instance = null;
let router = null

function render(props = {}) {
  const { container } = props;
  router = new Router({
    // 注意这里的name,最好不要写死，直接使用主应用传过来的name
    base: window.__POWERED_BY_QIANKUN__ ? '/app2' : "/",
    mode: "history",
    routes,
  });

  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("[vue2] vue app bootstraped");
}

export async function mount(props) {
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
  router = null;
}
