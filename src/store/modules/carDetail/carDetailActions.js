import CarsService from '../../../services/cars.service'

export default {

  getById ({ state, commit }, payload) {
    commit('SET_LOADING', true)
    return CarsService.getById(payload.params.id)
      .then(response => {  
        commit('SET_CAR_DETAIL', response.data)       
      })
      .catch(error => commit('SET_ERROR', error.message))
      .finally(() => commit('SET_LOADING', false))
  }
}
