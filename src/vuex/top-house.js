import Vue from 'vue'

export default {
  state: {
    items: []
  },
  mutations: {
    setTopHouseItems (state, items) {
      state.items = items
    }
  },
  actions: {
    loadTopHouseItems ({ commit, dispatch }) {
      this.items = []
      dispatch('loading', true)
      return Vue.houseApi('/house/top/items').then(items => {
        commit('setTopHouseItems', items)
        dispatch('loading', false)
      })
    }
  },
  getters: {
    getTopHouseItems (state) {
      return state.items
    }
  }
}
