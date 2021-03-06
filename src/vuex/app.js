import cookie from 'vux/src/tools/cookie'

export default {
  state: {
    language: 'en-US',
    areaId: 'ma',
    isShowDownload: true,
    isLoading: false
  },
  mutations: {
    UPDATE_LOADING (state, status) {
      state.isLoading = status
    },
    CHENGE_AREA (state, id) {
      state.areaId = id
    },
    CHANGE_LANGUAGE (state, value) {
      state.language = value
    },
    CHANGE_DOWNLOAD_STATE (state, status) {
      state.isShowDownload = status
    }
  },
  actions: {
    loading ({ commit }, status) {
      commit('UPDATE_LOADING', status)
    },
    changeLanguage ({ commit, dispatch }, lang) {
      cookie.set('language', lang)

      commit('CHANGE_LANGUAGE', lang)
      dispatch('loadTopHouseItems')
    },
    changeArea ({ commit, dispatch }, id) {
      commit('CHENGE_AREA', id)
      dispatch('loadTopHouseItems')
    },
    closeDownload ({commit}) {
      commit('CHANGE_DOWNLOAD_STATE', false)
    }
  }
}
