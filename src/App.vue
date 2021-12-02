<template>
<div id="app">
  <full-page id="fullpage" :options="fullpageOptions">

    <IntroSection :contents="table_of_contents"/>
    <TermsSection/>
    <BlockchainSection/>
    <PowBlockchainSection/>
    <TimeChainSection/>
    <RealBlocksSection/>
    <ResourcesSection/>

  </full-page>
</div>
</template>

<script>
import BlockchainSection from '@/components/sections/BlockchainSection.vue';
import RealBlocksSection from '@/components/sections/RealBlocksSection.vue';
import IntroSection from '@/components/sections/IntroSection.vue';
import PowBlockchainSection from '@/components/sections/PowBlockchainSection.vue';
import ResourcesSection from '@/components/sections/ResourcesSection.vue';
import TermsSection from '@/components/sections/TermsSection.vue';
import TimeChainSection from '@/components/sections/TimeChainSection.vue';

export default {
  name: 'app',
  components: {
    BlockchainSection,
    RealBlocksSection,
    IntroSection,
    PowBlockchainSection,
    ResourcesSection,
    TermsSection,
    TimeChainSection
  },
  data() {
    return {
      fullpageOptions: {
        anchors: [],
        licenseKey: '2C8168FC-415648B7-B94C4003-80F51EAC',

        scrollingSpeed: 1000,
        scrollBar: false,
        scrollOverflow: true,
        scrollOverflowReset: true,

        scrollHorizontally: true,
        navigation: true,
        normalScrollElements: '.blockchain_wrapper',

        parallax: true,
        parallaxKey: 'bmlsc2xvZXdlbi5jb21fSTQyY0dGeVlXeHNZWGc9ME1T',
        parallaxOptions: {
          type: 'reveal',
          percentage: 62,
          property: 'translate'
        }
      },
      table_of_contents: [
        { anchor: 'intro', label: 'Intro' },
        {
          anchor: 'terms',
          label: 'Terms',
          slides: [
            { anchor: 'hexadecimal_notation', label: 'Numerical Notation' },
            { anchor: 'hash_functions', label: 'Hash Functions' },
            { anchor: 'sha256', label: 'SHA-256' }
          ]
        },
        {
          anchor: 'blockchain',
          label: 'Blockchain',
          slides: [
            { anchor: 'simple_blockchain', label: 'Simple Example' }
          ]
        },
        {
          anchor: 'pow',
          label: 'Mining',
          slides: [
            { anchor: 'target', label: 'Target' },
            { anchor: 'pow_blockchain', label: 'Proof-of-Work Blockchain' },
            { anchor: 'pow_mining', label: 'Proof-of-Work Mining' }
          ]
        },
        {
          anchor: 'timechain',
          label: 'Timechain',
          slides: [
            { anchor: 'difficulty_adjustment', label: 'Difficulty Adjustment' },
            { anchor: 'hash_rate', label: 'Hash Rate' },
            { anchor: 'probability', label: 'Probability' },
            { anchor: 'timechain_graph', label: 'Timechain Graph' }
          ]
        },
        { anchor: 'real_blocks', label: 'Real Blocks' },
        { anchor: 'resources', label: 'Resources' }
      ]
    };
  },
  mounted() {
    this.addAnchorsToFullpage();
    this.moveToUrl();
  },
  methods: {
    addAnchorsToFullpage() {
      this.table_of_contents.forEach((section) => {
        this.fullpageOptions.anchors.push(section.anchor);
      });
    },
    moveToUrl() {
      const anchors = window.location.hash.match(/(\w+)/g) || [].reverse();
      if (anchors.length > 0) {
        this.moveTo(anchors.pop());
      }
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira%20Code:wght@300..700&display=swap');

#app {
  background-color: #15202b;
  font-size: 16px;
  font-family: 'Fira Code', monospace;
  text-align: justify;
  color: white;
  text-shadow: #000 0 0 3px;
  -webkit-font-smoothing: antialiased;
}

a {
  color: white;
  text-decoration: underline;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

*::-webkit-scrollbar-track {
  background: #15202b;
}

*::-webkit-scrollbar-thumb {
  background-color: #17a2b8;
  border-radius: 20px;
  border: 3px solid #17a2b8;
}

.col {
  max-width: 584px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 3em;
  padding-bottom: 30vh;
}

.card {
  margin: 0 auto 1em auto;
  background-color: rgba(0, 0, 0, 0.3);
  max-width: 625px;
  box-shadow: -1px 2px 5px 0 gray;
  text-align: left;
}

.card-header {
  background-color: #343a40;
  color: white;
  text-shadow: black 0 0 5px;
}

.card-header svg {
  filter: drop-shadow(0px 0px 1px black);
}

.blockchain_wrapper {
  margin-top: 2em;
  text-align: center;
  max-height: 60vh;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.add_block_card,
.blockchain_wrapper {
  padding: 0 4px;
}

.list-group-item {
  background-color: transparent;
  border: none;
  font-size: 0.875rem;
  padding: 0 .5em;
}

.list-field {
  padding-top: 7px;
  padding-bottom: 0;
}

.list-value {
  overflow-y: auto;
  overflow-wrap: normal;
  padding-bottom: 7px;
  padding-top: 2px;
  border-bottom: 1px solid darkgray;
}

.card .list-value:last-child {
  border-bottom: none;
}

.table {
  margin-bottom: 0;
}

tr {
  background-color: transparent;
}

hr {
  border-top: 1px solid gray;
  margin: .5em 0;
}

.form-control,
.form-control:disabled, .form-control[readonly],
.input-group-text {
  background-color: inherit;
  text-shadow: #000 0 0 5px;
  color: inherit;
}

.form-control:focus {
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}

/* Target range slider */
.input-group > .custom-range,
.input-group > .custom-range:focus {
  background-color: inherit;
}

.custom-range::-webkit-slider-thumb {
  background-color: #17a2b8;
}

.dropdown-menu {
  box-shadow: -1px 2px 5px 0 gray;
  z-index: 100;
}

.dropdown-menu a {
  text-decoration: none;
}

.dropdown-menu a:hover {
  color: #17a2b8;
}

.dropdown-item.active {
  background-color: inherit;
  color: #17a2b8;
}

.dropdown-item:hover {
  background-color: inherit;
  color: white;
}

h1 {
  margin-bottom: 1em;
  text-align: center;
  color: #f9f9fb;
}

/* FullPage Controls */
#fp-nav {
  top: 33%;
}

.fp-controlArrow {
  top: 66%;
}

.fp-controlArrow.fp-prev {
  border-width: 16px 16px 16px 0;
}

.fp-controlArrow.fp-next {
  border-width: 16px 0 16px 16px;
}

#fp-nav ul li a span, .fp-slidesNav ul li a span {
  background-color: #f9f9fb;
}

.fp-slidesNav {
  transform: translate(50%, -50%);
}

.fp-bg {
  background-size: cover;
  background-position: center;
}

#intro_section .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/small_brain.jpg');
}

#terms_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/neurons_heating_up.jpg');
}

#hexadecimal_notation_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/neurons2.jpg');
}

#hash_functions_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/neurons3.jpg');
}

#sha256_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/Brain-image-by-pitju.jpg');
}

#blockchain_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/brain_black.webp');
}

#simple_blockchain_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/blue_brain.jpg');
}

#pow_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/orange_brain.jpg');
}

#difficulty_adjustment_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/orange_brain.jpg');
}

#target_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/brain_mushrooms.jpg');
}

#nonce_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/brain_mushrooms.jpg');
}

#mining_algorithm_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/transcending_forward.jpg');
}

#pow_blockchain_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/transcending_forward.jpg');
}

#pow_mining_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/transcending_forward.jpg');
}

#timechain_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/brain_man.jpg');
}

#timechain_blocks_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/brain_man.jpg');
}

#timechain_mining_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/transcending_forward.jpg');
}

#real_blocks_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/ascension.jpg');
}

#resources_section .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/ultimate.jpg');
}

</style>
