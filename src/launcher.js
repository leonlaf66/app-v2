import cookie from 'vux/src/tools/cookie'
import querystring from 'querystring'
import store from '@/vuex'

export default {
  install: function (Vue, options) {
    Vue.prototype.$$router = {
      replace (to) {
        let location = window.location.href.split('?')[0] + '?' + querystring.stringify(to.query)
        window.history.replaceState(null, '', location)
      }
    }

    // 语言初始化
    let language = null
    let query = querystring.parse(window.location.search.substr(1))
    if (query.hasOwnProperty('language')) {
      if (['en-US', 'zh-CN'].indexOf(query.language) !== -1) {
        language = query.language
      }
    }

    if (!language) {
      language = cookie.get('language')
    }

    if (typeof language === 'undefined') {
      if ((window.navigator.language || window.navigator.userLanguage) === 'zh-CN') {
        language = 'zh-CN'
      } else {
        language = 'en-US'
      }
    }

    cookie.set('language', language)
    store.commit('CHANGE_LANGUAGE', language)

    // 语言方式
    window.$tt = Vue.$tt = Vue.prototype.$tt = function (en, cn) {
      if (en instanceof Array) {
        if (en.length > 1) {
          cn = en[1]
          en = en[0]
        } else {
          en = en[0]
          cn = en
        }
      }
      return store.state.app.language === 'en-US' ? en : cn
    }
  }
}
