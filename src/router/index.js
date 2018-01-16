import Vue from 'vue'
import Router from 'vue-router'

import LayoutTop from '@/layouts/Top'
import PageHome from '@/pages/Home'
import PageYellowPage from '@/pages/YellowPage'
import PageNews from '@/pages/News'
import PageMy from '@/pages/My'
import PageMore from '@/pages/More'
import PageSchoolDistrict from '@/pages/SchoolDistrict'
import PageHouseSearch from '@/pages/HouseSearch'
import PageHouseDetail from '@/pages/HouseDetail'
import PageNewsView from '@/pages/news/View'
import PageYellowPageDetail from '@/pages/YellowPageDetail'
import PageWorkflow from '@/pages/BuyHouseFlow'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: LayoutTop,
      children: [
        {
          name: 'home',
          path: '/',
          meta: {keepAlive: true, title: ['Home', '首页']},
          component: PageHome
        },
        {
          path: '/yellowpage',
          name: 'yellowpage',
          meta: {keepAlive: true, title: ['Service', '管房养房']},
          component: PageYellowPage
        },
        {
          path: '/news',
          name: 'news',
          meta: {keepAlive: true, title: ['News', '新闻资讯']},
          component: PageNews
        },
        {
          path: '/my',
          name: 'my',
          meta: {keepAlive: true, title: ['My', '我的']},
          component: PageMy
        },
        {
          path: '/more',
          name: 'more',
          meta: {keepAlive: true, title: ['More', '更多']},
          component: PageMore
        }
      ]
    },
    {
      path: '/school-district',
      name: 'school-district',
      component: PageSchoolDistrict
    },
    {
      path: '/house/search/:type',
      name: 'house-search',
      meta: { keepAlive: true },
      component: PageHouseSearch
    },
    {
      path: '/house/:id',
      name: 'house-detail',
      component: PageHouseDetail
    },
    {
      path: '/news/:id',
      name: 'news-view',
      component: PageNewsView
    },
    {
      path: '/yellowpage/:id',
      name: 'yellowpage-detail',
      component: PageYellowPageDetail
    },
    {
      path: '/buy-house/flow',
      name: 'buy-house-flow',
      meta: {keepAlive: true, title: ['Workflow', '购房流程']},
      component: PageWorkflow
    }
  ]
})
