import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import App from './app.vue'
import './assets/styles/global.styl'
import createStore from './store'
import createRouter from './config/router'

Vue.use(Vuex)
Vue.use(VueRouter)

export default () => {
  const store = createStore()
  const router = createRouter()
  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })
  return {app, store, router}
}
