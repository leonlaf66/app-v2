import Vue from 'vue'
import Vuex from 'vuex'

import app from './app.js'
import topHouse from './top-house.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    topHouse
  }
})
