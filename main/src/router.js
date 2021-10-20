import Vue from 'vue'
import Router from 'vue-router'

import Home from "@/components/Home"
import HelloWorld from "@/components/HelloWorld"

Vue.use(Router)

const currentMenus = [
  {
    key: 'Home',
    title: '基底页',
    path: '/'
  },
  {
    kay: 'Hello',
    title: "Hello",
    path: '/hello'
  },
  {
    key: 'VueMicroApp1',
    title: 'app1',
    path: '/app1'
  },
  {
    key: 'VueMicroApp2',
    title: 'app2',
    path: '/app2'
  }
]
const router =  new Router({
  mode: 'history',
  routes: [
    {
      key: 'home',
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/hello',
          name: 'hello',
          component: HelloWorld
        }
      ]
    },
  ]
})

export {
  currentMenus,
  router
}