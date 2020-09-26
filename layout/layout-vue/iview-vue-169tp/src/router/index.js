import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Subject from '@/components/Subject'
import TabsItem from '@/components/topic/TabsItem'
import OverView from '@/components/OverView'
import CategoryItem from '@/components/CategoryItem'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'Subject',
      component: Subject,
      children: [
        {
          path: 'TabsItem',
          name: 'TabsItem',
          component: TabsItem
        },
        {
          path: 'OverView',
          name: 'OverView',
          component: OverView
        },
        {
          path: 'CategoryItem',
          name: 'CategoryItem',
          component: CategoryItem
        }
      ]
    }
  ]
})
