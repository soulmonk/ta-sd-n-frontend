import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import { CHECK_AUTH } from './store/actions.type'
import { initApi } from './common/api.service'
import DateFilter from './common/date.filter'
import ErrorFilter from './common/error.filter'

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.filter('error', ErrorFilter)

Vue.use(VueMaterial)
initApi()

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch(CHECK_AUTH)]).then(next)
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
