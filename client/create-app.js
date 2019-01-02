import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'

import App from './app.vue'
import './assets/styles/global.styl'
import createStore from './store'
import createRouter from './config/router'
import Notification from './components/notification'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Meta)
Vue.use(Notification)

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
