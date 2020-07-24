import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Tug from '@/components/Tug'
import Demo from '@/components/Demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Chat',
      name: 'tug',
      component: Tug
    },
    {
      path: '/Demo',
      name: 'demo',
      component: Demo
    }
  ]
})
