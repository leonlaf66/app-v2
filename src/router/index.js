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
          component: () => import('@/pages/home/index')
        },
        {
          path: '/:area_id/yellowpage',
          name: 'yellowpage',
          meta: {keepAlive: true, title: ['Service', '管房养房']},
          component: () => import('@/pages/yellowpage/index')
        },
        {
          path: '/:area_id/news',
          name: 'news',
          meta: {keepAlive: true, title: ['News', '新闻资讯']},
          component: () => import('@/pages/news/index')
        },
        {
          path: '/:area_id/my',
          name: 'my',
          meta: {keepAlive: true, title: ['My', '我的']},
          component: () => import('@/pages/my/index')
        },
        {
          path: '/:area_id/more',
          name: 'more',
          meta: {keepAlive: true, title: ['More', '更多']},
          component: () => import('@/pages/more/index')
        }
      ]
    },
    {
      path: '/:area_id/house/search/:type',
      name: 'house-search',
      meta: { keepAlive: true },
      component: () => import('@/pages/house/search')
    },
    {
      path: '/:area_id/house/:id',
      name: 'house-detail',
      component: () => import('@/pages/house/detail')
    },
    {
      path: '/:area_id/news/:id',
      name: 'news-view',
      component: () => import('@/pages/news/view')
    },
    {
      path: '/:area_id/yellowpage/:id',
      name: 'yellowpage-detail',
      component: () => import('@/pages/yellowpage/view')
    },
    {
      path: '/:area_id/buy-house/flow',
      name: 'buy-house-flow',
      meta: {keepAlive: true, title: ['Workflow', '购房流程']},
      component: () => import('@/pages/house/workflow')
    },
    /* passport */
    {
      path: '/:area_id/login',
      name: 'login',
      meta: {title: ['Login', '用户登陆']},
      component: () => import('@/pages/passport/login')
    },
    {
      path: '/:area_id/register',
      name: 'register',
      meta: {title: ['Login', '用户注册']},
      component: () => import('@/pages/passport/register')
    },
    /* members */
    {
      path: '/:area_id/my-favorites',
      name: 'my-favorites',
      meta: {title: ['My Favorites', '我的收藏'], auth: true},
      component: () => import('@/pages/member/favorites')
    },
    {
      path: '/:area_id/my-schedules',
      name: 'my-schedules',
      meta: {title: ['My Schedules', '我的预约'], auth: true},
      component: () => import('@/pages/member/schedules')
    }
  ]
})
