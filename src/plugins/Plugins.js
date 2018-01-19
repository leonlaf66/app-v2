import store from '@/vuex'

export default {
  install (Vue, options) {
    window.$tt = Vue.$tt = Vue.prototype.$tt = (en, cn) => {
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

    Vue.prototype.$setPageTitle = (title) => {
      window.document.setDocumentTitle(title + '-' + window.$tt('Usleju', '米乐居'))
    }

    Vue.prototype.$scrollTop = (val) => {
      document.body.scrollTop = val
      document.documentElement.scrollTop = val
    }

    Vue.filter('price', (value) => {
      if (store.state.app.language === 'zh-CN') {
        if (parseFloat(value) > 10000) {
          return `${window.numeral(value / 10000.0).format('0,0.00')}万美元`
        }
        return `${window.numeral(value).format('0,0')}美元`
      }

      return '$' + `${window.numeral(value).format('0,0')}`
    })

    Vue.filter('square', (value) => {
      if (!value) {
        return ''
      }

      value = parseFloat(value)
      if (store.state.app.language === 'zh-CN') {
        value = parseInt(value * 0.092903)
        return value + '平方米'
      }
      return value + 'Sq.Ft'
    })

    Vue.filter('listDayDesc', (value) => {
      if (value === '0' || value === 0) {
        return window.$tt('New listing', '当日上市')
      }
      return window.$tt(`${value} days on market`, `已上市${value}天`)
    })

    Vue.filter('fieldDisplay', (value) => {
      if (!value || value === '') {
        return window.$tt('Unknown', '未提供')
      }

      return value
    })

    Vue.filter('housePropName', (value) => {
      let props = {
        'RN': ['Rental', '租房'],
        'SF': ['Single Family', '单家庭'],
        'MF': ['Multi Family', '多家庭'],
        'CC': ['Condominium', '公寓'],
        'CI': ['Commercial', '商业用房'],
        'BU': ['Business Opportunity', '营业用房'],
        'LD': ['Land', '土地']
      }
      return props[value]
    })

    Vue.filter('$tt', (en, cn) => {
      return Vue.$tt(en, cn)
    })

    window.$house = Vue.prototype.$house = {
      getImageUrl (mlsId, id, idx = 0, w = 800, h = 800) {
        if (store.state.app.areaId === 'ma') {
          return `http://media.mlspin.com/Photo.aspx?mls=${id}&n=${idx}&w=800&h=800`
        } else {
          if (!mlsId) return null
          return `http://photos.listhub.net/${mlsId}/${id}/${idx + 1}`
        }
      }
    }
  }
}
