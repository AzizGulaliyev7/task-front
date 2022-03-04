import Vue from 'vue'
import Vuex from 'vuex'
import {state} from './state'
import modules from './modules'
import {getters} from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: modules,
  state: state,
  getters: getters,
})
