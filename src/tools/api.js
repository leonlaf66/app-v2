import config from '@/configs/main.js'
import store from '@/vuex'

export default {
  install (Vue, options) {
    let vm = Vue
    let params = {
      app_token: config.api.appToken
    }

    let request = function (config) {
      config.params.area_id = store.state.app.areaId
      config.params.language = store.state.app.language
      if (store.state.account.user) {
        config.params.access_token = store.state.account.user.access_token
      }
      return config
    }
    let responseSucess = function (response) {
      if (response.data.code && response.data.message) {
        Vue.$vux.alert.show({title: response.data.code, content: response.data.message})
        return Promise.reject(response.message)
      }
      return response.data
    }
    let responseError = function (error) {
      return Promise.reject(error)
    }

    let apis = {
      'houseApi': process.env.API_HOUSE_URL,
      'ypApi': process.env.API_YP_URL,
      'newsApi': process.env.API_NEWS_URL,
      'passportApi': process.env.API_PASSPORT_URL,
      'memberApi': process.env.API_MEMBER_URL,
      'commentApi': process.env.API_COMMENT_URL
    }

    for (let domainId in apis) {
      let baseURL = apis[domainId]
      vm[domainId] = vm.prototype['$' + domainId] = Vue.http.create({
        baseURL: baseURL,
        params
      })
      vm[domainId].interceptors.request.use(request)
      vm[domainId].interceptors.response.use(responseSucess, responseError)
    }
  }
}
