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
      return config
    }
    let responseSucess = function (response) {
      return response.data
    }
    let responseError = function (error) {
      return Promise.reject(error)
    }

    // house api
    vm.houseApi = vm.prototype.$houseApi = Vue.http.create({
      baseURL: process.env.API_HOUSE_URL,
      params
    })
    vm.houseApi.interceptors.request.use(request)
    vm.houseApi.interceptors.response.use(responseSucess, responseError)

    // yellowpage api
    vm.ypApi = vm.prototype.$ypApi = Vue.http.create({
      baseURL: process.env.API_YP_URL,
      params
    })
    vm.ypApi.interceptors.request.use(request)
    vm.ypApi.interceptors.response.use(responseSucess, responseError)

    // news api
    vm.newsApi = vm.prototype.$newsApi = Vue.http.create({
      baseURL: process.env.API_NEWS_URL,
      params
    })
    vm.newsApi.interceptors.request.use(request)
    vm.newsApi.interceptors.response.use(responseSucess, responseError)
  }
}
