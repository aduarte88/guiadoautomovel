import CarsService from '../../../services/posts.service'

export default {
  
  getAll ({ state, commit }, payload) {
    commit('SET_LOADING', true)

    return CarsService.getAllCars(payload.params)
      .then(response => {
      
        commit('SET_CARS', response.data)
           
      })
      .catch(error => commit('SET_ERROR', error.message))
      .finally(() => commit('SET_LOADING', false))
  }
}
