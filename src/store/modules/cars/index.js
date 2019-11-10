import state from './carsState'
import mutations from './carsMutations'
import getters from './carsGetters'
import actions from './carsActions'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
