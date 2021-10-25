import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, IconsPlugin, CardPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(CardPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueFullPage from 'vue-fullpage.js'
Vue.use(VueFullPage);

// Global Variables
Vue.prototype.$block = Object;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

