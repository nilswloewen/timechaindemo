import Vue from 'vue';
import VueRouter from 'vue-router'
import VueTour from 'vue-tour';

import { BootstrapVue, CardPlugin, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap_overrides.css';

import VueFullPage from 'vue-fullpage.js';
import 'fullpage.js/vendors/scrolloverflow';
import './services/fullPagejs/scrollHorizontally/fullpage.scrollHorizontally.min';
import './services/fullPagejs/scrollOverflowReset/fullpage.scrollOverflowReset.min';
import './css/fullpage_overrides.css';

import App from './App.vue';

require('vue-tour/dist/vue-tour.css');

Vue.use(BootstrapVue);
Vue.use(CardPlugin);
Vue.use(IconsPlugin);
Vue.use(VueFullPage);
Vue.use(VueRouter)
Vue.use(VueTour);

Vue.mixin({
  data() {
    return {
      hexDigits: 2,
    };
  },
  methods: {
    moveTo(anchor, index) {
      window.fullpage_api.moveTo(anchor, index);
    },
    previousSlide() {
      fullpage_api.moveSlideLeft();
    },
    nextSlide() {
      fullpage_api.moveSlideRight();
    },
    nextSection() {
      fullpage_api.moveSectionDown();
    },
    prevSection() {
      fullpage_api.moveSectionUp();
    },
  },
});

Vue.config.productionTip = false;
Vue.config.silent = true;
new Vue({
  render: (h) => h(App),
}).$mount('#app');
