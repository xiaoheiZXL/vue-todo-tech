import Vuex from 'vuex'
import state from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

export default () => {
  const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
      a: {
        namespaced: true,
        state: {
          count: 10
        },
        mutations: {
          updateCount1 (state, count) {
            state.count = count
          }
        }
      }
    }
  })

  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const state = require('./state/state').default
      const mutations = require('./mutations/mutations').default
      const actions = require('./actions/actions').default
      const getters = require('./getters/getters').default

      store.hotUpdate({
        state,
        mutations,
        actions,
        getters
      })
    })
  }

  return store
}
