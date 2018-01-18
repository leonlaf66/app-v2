import cookie from 'vux/src/tools/cookie'
import querystring from 'querystring'

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
    window.$lang = Vue.$lang = Vue.prototype.$lang = language

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
      return window.$lang === 'en-US' ? en : cn
    }

    // 房源区域
    let areaId = cookie.get('area-id')
    if (typeof areaId === 'undefined') {
      areaId = 'ma'
      cookie.set('area-id', areaId)
    }
    window.$areaId = Vue.$areaId = Vue.prototype.$areaId = areaId

    Vue.prototype.$env = {
      changeLang (lang) {
        cookie.set('language', lang)
        // window.$lang = Vue.$lang = Vue.prototype.$lang = lang
        window.location.href = window.location.href.split('?')[0] + '?t=' + (new Date()).getTime()
      },
      changeAreaId (areaId) {
        cookie.set('area-id', areaId)
        // window.$areaId = Vue.$areaId = Vue.prototype.$areaId = areaId
        window.location.href = window.location.href.split('?')[0] + '?t=' + (new Date()).getTime()
      }
    }
  }
}
