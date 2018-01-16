export default {
  state: {
    isLoading: false
  },
  mutations: {
    UPDATE_LOADING (state, status) {
      state.isLoading = status
    }
  },
  actions: {
    loading ({ commit }, status) {
      commit('UPDATE_LOADING', status)
    }
  }
}
