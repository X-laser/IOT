import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import './assets/scss/index.scss'
import api from './api'
import './plugins'
import './components'

Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
