import Vue from 'vue'
import VueRouter from 'vue-router'
import FastClick from 'fastclick'
import AjaxPlugin from 'vux/src/plugins/ajax'
import App from './App'
import router from './router'
import Vue2Filters from 'vue2-filters'
import Plugins from '@/plugins/Plugins'
import Launcher from '@/launcher.js'
import Api from '@/tools/api.js'
import VueScroller from 'vue-scroller'
import store from '@/vuex/index.js'
import VueBgSrc from 'vue-bg-src'

require('@/styles/reset.scss')
require('vue-visual/index.css')
require('@/styles/styles.scss')

Vue.use(Vue2Filters)
Vue.use(VueScroller)
Vue.use(AjaxPlugin)
Vue.use(VueRouter)
Vue.use(Plugins)
Vue.use(Launcher, { router })
Vue.use(Api, { router })
Vue.use(VueBgSrc)

FastClick.attach(document.body)

Vue.config.productionTip = false
/**
 * 兼容微信设置页面的title
 */
window.document.setDocumentTitle = function (title) {
  window.document.title = title
  let ua = navigator.userAgent
  if (/\bMicroMessenger\/([\d.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    var i = document.createElement('iframe')
    i.src = '//m.baidu.com/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(function () {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}

router.afterEach((to, from) => {
  window.document.body.className = ' route-' + to.name + ' ' + store.state.app.language
  let title = window.$tt('Usleju', '米乐居')
  if (typeof to.meta.title !== 'undefined') {
    title = window.$tt(to.meta.title) + '-' + title
  }
  window.document.setDocumentTitle(title)
})

let vue = new Vue({
  store,
  router,
  render: h => h(App)
})

vue.$mount('#app')
