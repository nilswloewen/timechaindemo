import { BootstrapVue, IconsPlugin, CardPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import VueFullPage from 'vue-fullpage.js';

import Vue from 'vue';
import App from './App.vue';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(CardPlugin);
Vue.use(VueFullPage);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
