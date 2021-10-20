import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './public-path';
import App from './App.vue'
import routes from './router'

Vue.use(Router)
Vue.use(ElementUI);

Vue.config.productionTip = false

let instance = null;
let router = null

function render(props = {}) {
  const { container } = props;
  router = new Router({
    base: window.__POWERED_BY_QIANKUN__ ? "/app1" : "/",
    mode: "history",
    routes,
  })

  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app1') : '#app1');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null
}