export default {
  state: {
    type: null,
    q: '',
    filters: {},
    sort: {
      field: 'ldays',
      dir: 'asc'
    }
  },
  mutations: {
    HOUSE_SEARCH_QTEXT (state, q) {
      state.q = q
    },
    HOUSE_SEARCH_FILTERS (state, values) {
      state.filters = values
    },
    HOUSE_SEARCH_SORT (state, sort) {
      state.sort = sort
    }
  }
}
