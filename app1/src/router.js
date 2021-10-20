import Vue from 'vue'
import Router from 'vue-router'

import Comp1 from "@/components/Comp1"
import Comp2 from "@/components/Comp2"

Vue.use(Router)

export default [
  {
    path: '/', redirect: '/comp1'
  },
  {
    path: '/comp1',
    name: 'comp1',
    component: Comp1
  },
  {
    path: '/comp2',
    name: 'comp2',
    component: Comp2
  }
]
// export default new Router({
//     mode: 'history',
//     base: '/',
//     routes: [

//     ]
//   })