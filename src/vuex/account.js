import cookie from 'vux/src/tools/cookie'

export default {
  state: {
    user: null
  },
  mutations: {
    CHANGE_USER (state, user) {
      state.user = user
    }
  },
  actions: {
    login ({ commit }, user) {
      commit('CHANGE_USER', user)
      cookie.set('auth.user', JSON.stringify(user))
    },
    logout ({ commit, dispatch }) {
      commit('CHANGE_USER', null)
      cookie.remove('auth.user')
    }
  }
}
