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

    scrollToElm(wrapper, element, duration) {
      const startTime = performance.now();
      const wrapperPos = wrapper.getBoundingClientRect();

      function animateScroll() {
        const now = performance.now();
        const elapsed = (now - startTime) / 1000;
        const t = elapsed / duration;
        console.log(`t: ${t}`);
        const quad = t < 0.5
          ? 2 * t * t
          : -1 + (4 - 2 * t) * t;

        const elementPos = element.getBoundingClientRect();
        const relativePos = elementPos.top - wrapperPos.top + wrapper.scrollTop;

        const change = relativePos - wrapper.scrollTop;
        const distance = wrapper.scrollTop + change * quad;

        console.log(`Current Wrapper scrollTop: ${wrapper.scrollTop}`);
        console.log(`Change: ${change}`);
        console.log(`Distance: ${distance}`);

        // eslint-disable-next-line no-param-reassign
        wrapper.scrollTop = distance;

        // setTimeout(() => { animateScroll(); }, 50);
        if (t < 1) {
          window.requestAnimationFrame(animateScroll);
        }
      }

      animateScroll();
    },
  },
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
