import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:area_id',
      component: () => import('@/layouts/Top'),
      children: [
        {
          path: '/:area_id',
          name: 'home',
          meta: {keepAlive: true, title: ['Home', '首页']},
          component: () => import('@/pages/Home')
        },
        {
          path: '/:area_id/yellowpage',
          name: 'yellowpage',
          meta: {keepAlive: true, title: ['Service', '管房养房']},
          component: () => import('@/pages/YellowPage')
        },
        {
          path: '/:area_id/news',
          name: 'news',
          meta: {keepAlive: true, title: ['News', '新闻资讯']},
          component: () => import('@/pages/News')
        },
        {
          path: '/:area_id/my',
          name: 'my',
          meta: {keepAlive: true, title: ['My', '我的']},
          component: () => import('@/pages/My')
        },
        {
          path: '/:area_id/more',
          name: 'more',
          meta: {keepAlive: true, title: ['More', '更多']},
          component: () => import('@/pages/More')
        }
      ]
    },
    {
      path: '/:area_id/school-district',
      name: 'school-district',
      component: () => import('@/pages/SchoolDistrict')
    },
    {
      path: '/:area_id/house/search/:type',
      name: 'house-search',
      meta: { keepAlive: true },
      component: () => import('@/pages/HouseSearch')
    },
    {
      path: '/:area_id/house/:id',
      name: 'house-detail',
      component: () => import('@/pages/HouseDetail')
    },
    {
      path: '/:area_id/news/:id',
      name: 'news-view',
      component: () => import('@/pages/news/View')
    },
    {
      path: '/:area_id/yellowpage/:id',
      name: 'yellowpage-detail',
      component: () => import('@/pages/YellowPageDetail')
    },
    {
      path: '/:area_id/buy-house/flow',
      name: 'buy-house-flow',
      meta: {keepAlive: true, title: ['Workflow', '购房流程']},
      component: () => import('@/pages/BuyHouseFlow')
    }
  ]
})
