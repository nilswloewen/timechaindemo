import { BootstrapVue, IconsPlugin, CardPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import 'fullpage.js/vendors/scrolloverflow';
import './services/fullPagejs/scrollOverflowReset/fullpage.scrollOverflowReset.min';
import './services/fullPagejs/scrollHorizontally/fullpage.scrollHorizontally.min';
import VueFullPage from 'vue-fullpage.js';

import Vue from 'vue';
import App from './App.vue';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(CardPlugin);
Vue.use(VueFullPage);

Vue.mixin({
  methods: {
    moveTo(anchor, index) {
      window.fullpage_api.moveTo(anchor, index);
    },
  },
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
