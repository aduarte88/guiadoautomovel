export default {
  SET_ITEMS (state, data) {
    state.items = data
  },

  SET_ITEMS2 (state, data) {
    console.log("state: ",state);
    console.log(data);
    state.items2 = data
    console.log("state:_before: ",state);
  },

  SET_PAGINATION (state, payload) {
    state.pagination = {
      page: payload.page || state.pagination.page,
      limit: payload.limit || state.pagination.limit,
      total: payload.total || state.pagination.total
    }
  },

  SET_ERROR (state, data) {
    state.error = data
  },

  SET_LOADING (state, data) {
    state.loading = data
  }
}
