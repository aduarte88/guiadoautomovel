import PostsService from '../../../services/posts.service'

export default {

  getById ({ state, commit }, payload) {
    commit('SET_LOADING', true)
    console.log("newsActions by id.js");
    console.log(payload);
    return PostsService.getByIdPublic(payload.params.id)
      .then(response => {
        console.log(response);
      
        commit('SET_CAR_DETAIL', response.data)
       // commit('SET_PAGINATION', { total: response.data.total })
        
      })
      .catch(error => commit('SET_ERROR', error.message))
      .finally(() => commit('SET_LOADING', false))
  }
}
