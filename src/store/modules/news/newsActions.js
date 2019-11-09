import PostsService from '../../../services/posts.service'

export default {
  getListPublic ({ state, commit }, payload) {
    commit('SET_LOADING', true)
    console.log("newsActions.js");
    console.log(payload);
    return PostsService.getListPublic(payload.params)
      .then(response => {
        console.log(response);
        commit('SET_ITEMS', response.data)
       // commit('SET_PAGINATION', { total: response.data.total })
        
      })
      .catch(error => commit('SET_ERROR', error.message))
      .finally(() => commit('SET_LOADING', false))
  },

  getListPublicById ({ state, commit }, payload) {
    commit('SET_LOADING', true)
    console.log("newsActions by id.js");
    console.log(payload);
    return PostsService.getByIdPublic(payload.params.id)
      .then(response => {
        console.log(response);
        console.log(state)
        commit('SET_ITEMS2', response.data)
       // commit('SET_PAGINATION', { total: response.data.total })
        
      })
      .catch(error => commit('SET_ERROR', error.message))
      .finally(() => commit('SET_LOADING', false))
  }
}
