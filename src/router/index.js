import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component () {
        return import('@/layouts/Top')
      },
      children: [
        {
          name: 'home',
          path: '/',
          meta: {keepAlive: true, title: ['Home', '首页']},
          component () {
            return import('@/pages/Home')
          }
        },
        {
          path: '/yellowpage',
          name: 'yellowpage',
          meta: {keepAlive: true, title: ['Service', '管房养房']},
          component () {
            return import('@/pages/YellowPage')
          }
        },
        {
          path: '/news',
          name: 'news',
          meta: {keepAlive: true, title: ['News', '新闻资讯']},
          component () {
            return import('@/pages/News')
          }
        },
        {
          path: '/my',
          name: 'my',
          meta: {keepAlive: true, title: ['My', '我的']},
          component () {
            return import('@/pages/My')
          }
        },
        {
          path: '/more',
          name: 'more',
          meta: {keepAlive: true, title: ['More', '更多']},
          component () {
            return import('@/pages/More')
          }
        }
      ]
    },
    {
      path: '/school-district',
      name: 'school-district',
      component () {
        return import('@/pages/SchoolDistrict')
      }
    },
    {
      path: '/house/search/:type',
      name: 'house-search',
      meta: { keepAlive: true },
      component () {
        return import('@/pages/HouseSearch')
      }
    },
    {
      path: '/house/:id',
      name: 'house-detail',
      component () {
        return import('@/pages/HouseDetail')
      }
    },
    {
      path: '/news/:id',
      name: 'news-view',
      component () {
        return import('@/pages/news/View')
      }
    },
    {
      path: '/yellowpage/:id',
      name: 'yellowpage-detail',
      component () {
        return import('@/pages/YellowPageDetail')
      }
    },
    {
      path: '/buy-house/flow',
      name: 'buy-house-flow',
      meta: {keepAlive: true, title: ['Workflow', '购房流程']},
      component () {
        return import('@/pages/BuyHouseFlow')
      }
    }
  ]
})
