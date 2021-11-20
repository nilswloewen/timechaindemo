import Vue from 'vue';
import { BootstrapVue, IconsPlugin, CardPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import './services/fullPagejs/parallax/fullpage.parallax.min';

import 'fullpage.js/vendors/scrolloverflow';
import './services/fullPagejs/scrollOverflowReset/fullpage.scrollOverflowReset.min';
import './services/fullPagejs/scrollHorizontally/fullpage.scrollHorizontally.min';

import VueFullPage from 'vue-fullpage.js';

import App from './App.vue';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(CardPlugin);
Vue.use(VueFullPage);

Vue.mixin({
  data() {
    return {
      encoding: ['hexadecimal', 'decimal', 'exponential', 'binary'],
    };
  },
  methods: {
    moveTo(anchor, index) {
      window.fullpage_api.moveTo(anchor, index);
    },
    encode(bigInt) {
      return {
        bigInt,
        binary: bigInt.toString(2).padStart(256, '0'),
        decimal: bigInt.toLocaleString('en-US').padStart(103, '000,'),
        // @TODO: Figure out exponential for bigInt.
        exponential: bigInt.toLocaleString('en-US').padStart(103, '000,'),
        hexadecimal: bigInt.toString(16).padStart(64, '0'),
      };
    },
    rotateEncoding() {
      this.encoding.push(this.encoding.shift());
    },

    scrollToElm(wrapper, element, duration) {
      const startTime = performance.now();
      const wrapperPos = wrapper.getBoundingClientRect();

      function animateScroll() {
        const now = performance.now();
        const elapsed = (now - startTime) / 1000;
        const t = elapsed / duration;
        const quad = t < 0.5
          ? 2 * t * t
          : -1 + (4 - 2 * t) * t;

        const elementPos = element.getBoundingClientRect();
        const relativePos = elementPos.top - wrapperPos.top + wrapper.scrollTop;
        console.log(`\nquad: ${quad}`);
        console.log(`relativePos: ${relativePos}`);

        const distance = relativePos * quad;

        console.log(`t: ${t}`);
        console.log(`Current Wrapper scrollTop: ${wrapper.scrollTop}`);
        console.log(`Distance: ${distance}`);

        // eslint-disable-next-line no-param-reassign
        wrapper.scrollTop = distance;

        if (t < 1) {
          // window.requestAnimationFrame(animateScroll);
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
