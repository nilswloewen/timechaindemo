<template>
<div id="app">
  <full-page id="fullpage" :options="fullpageOptions">

    <IntroSection :contents="table_of_contents"/>
    <TermsSection/>
    <BlockchainSection/>
    <PowBlockchainSection/>
    <TimeChainSection/>
    <HistoricalBlocksSection/>
    <ResourcesSection/>

  </full-page>
</div>
</template>

<script>
import BlockchainSection from '@/components/sections/BlockchainSection.vue';
import HistoricalBlocksSection from '@/components/sections/HistoricalBlocksSection.vue';
import IntroSection from '@/components/sections/IntroSection.vue';
import PowBlockchainSection from '@/components/sections/PowBlockchainSection.vue';
import ResourcesSection from '@/components/sections/ResourcesSection.vue';
import TermsSection from '@/components/sections/TermsSection.vue';
import TimeChainSection from '@/components/sections/TimeChainSection.vue';

export default {
  name: 'app',
  components: {
    BlockchainSection,
    HistoricalBlocksSection,
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
        navigationTooltips: [],
        licenseKey: '2C8168FC-415648B7-B94C4003-80F51EAC',

        scrollingSpeed: 1000,
        scrollBar: false,
        scrollOverflow: true,
        scrollOverflowReset: true,
        scrollOverflowResetKey: 'bmlsc2xvZXdlbi5jb21fVVFuYzJOeWIyeHNUM1psY21ac2IzZFNaWE5sZEE9PVUyRw==',

        scrollHorizontally: true,
        scrollHorizontallyKey: 'bmlsc2xvZXdlbi5jb21fV08zYzJOeWIyeHNTRzl5YVhwdmJuUmhiR3g1MjZ2',

        slidesNavigation: true,
        slidesNavPosition: 'top',
        // responsiveWidth: 800,
        navigation: true,
        normalScrollElements: ['.blockchain_wrapper', '.list-value'],

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
          label: 'Mining / Proof-of-Work',
          slides: [
            { anchor: 'target', label: 'Target' },
            { anchor: 'pow_blockchain', label: 'POW Blockchain' },
            { anchor: 'pow_mining', label: 'POW Mining' }
          ]
        },
        {
          anchor: 'timechain',
          label: 'Timechain',
          slides: [
            { anchor: 'difficulty_adjustment', label: 'Difficulty Adjustment' },
            { anchor: 'timechain_blockchain', label: 'Timechain' },
            { anchor: 'timechain_mining', label: 'Timechain Mining' }
          ]
        },
        {
          anchor: 'real_blocks',
          label: 'Historical Blocks',
          slides: [
            { anchor: 'real_mining', label: 'Real-World Mining' }
          ]
        },
        { anchor: 'resources', label: 'Resources' }
      ]
    };
  },
  mounted() {
    this.addAnchorsToFullpage();
  },
  methods: {
    addAnchorsToFullpage() {
      this.table_of_contents.forEach((section) => {
        this.fullpageOptions.anchors.push(section.anchor);
        this.fullpageOptions.navigationTooltips.push(section.label);
      });
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
  text-shadow: #000 -1px 1px 4px;
  -webkit-font-smoothing: antialiased;
}

a {
  color: white;
  text-decoration: underline;
}
a:hover {
  color: #f79413;
}

.table {
  margin-bottom: 0;
  color: white;
}
tr {
  background-color: transparent;
}
hr {
  border-top: 1px solid gray;
  margin: 1em 0;
}
h1 {
  margin-bottom: 1em;
  text-align: center;
  color: #f9f9fb;
}

/* Scrollbars */
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
  /*padding-bottom: 30vh;*/
}

.card {
  margin: 0 auto 2em auto;
  background-color: rgba(0, 0, 0, 0.3);
  max-width: 625px;
  box-shadow: -2px 3px 10px 2px slategray;
  text-align: left;
}
.card-header {
  background-color: #343a40;
  color: white;
  line-height: 1em;
}
.card-header svg {
  filter: drop-shadow(-2px 2px 2px black);
}
.tldr.card {
  max-width: 500px;
  text-align: center;
  box-shadow: -1px 2px 4px 2px #f79413;
  border-color:  #f79413;
  margin: 2em auto;
}
.tldr .card-header {
  background-color: #f79413;
  padding: .2em;
}
.tldr .card-body {
  padding: .2em;
}

.blockchain_wrapper {
  margin-top: 2em;
  text-align: center;
  min-height: 60vh;
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
  overflow-x: auto;
  overflow-wrap: normal;
  padding-bottom: 7px;
  padding-top: 2px;
  border-bottom: 1px solid darkgray;
}
.card .list-value:last-child {
  border-bottom: none;
}

.form-control,
.form-control:disabled, .form-control[readonly],
.input-group-text {
  background-color: inherit;
  /*text-shadow: #000 0 0 5px;*/
  color: inherit;
}

.form-control:focus {
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}

.form-control.is-valid {
  border-color: #f79413;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%23f79413' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e")
}
.btn-primary,
.btn-primary.disabled,
.btn-primary:focus,
.btn-primary:hover {
  background-color: #3CAFAA;
  border-color: #3CAFAA;
}
.btn-secondary,
.btn-secondary.disabled,
.btn-secondary:focus,
.btn-secondary:hover {
  background-color: #7855F5;
  border-color: #7855F5;
}
.btn-warning,
.btn-warning:hover {
  background-color: #61e294;
  border-color: #61e294;
}

.btn-info,
.btn-info:hover,
.card.info .card-header,
.bg-info {
  background-color: #7855F5 !important;
  border-color: #7855F5;
}
.card.info {
  box-shadow: -2px 3px 10px 2px  #7855F5;
  border-color: #7855F5;
}

.rotate_encoding_btn {
  background-color: transparent;
  border: none;
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


/* FullPage Controls */
#fp-nav.fp-right {
  top: 33%;
  right: -6px;
}
.fp-controlArrow {
  top: 66%;
  /*border: solid white;*/
  /*border-width: 0 3px 3px 0;*/
  /*display: inline-block;*/
  /*padding: 4px;*/
}
.fp-controlArrow.fp-prev {
  border-width: 10px 10px 10px 0;
  left: 4px;
}
.fp-controlArrow.fp-next {
  border-width: 10px 0 10px 10px;
  right: 4px;
}

/* Nav dots on right */
#fp-nav ul li a span, .fp-slidesNav ul li a span {
  background-color: white;
  height: 2px;
  width: 2px;
}
#fp-nav ul li a.active span,
#fp-nav ul li:hover a.active span,
.fp-slidesNav ul li a.active span,
.fp-slidesNav ul li:hover a.active span {
  height: 8px;
  width: 8px;
  margin: -6px 0 0 -5px;
}
.fp-slidesNav {
  transform: translate(50%, -50%);
  left: 0;
  right: 30px !important;
}

.next_section_btn {
  margin-top: 3em;
  text-align: center;
}
.next_section_btn span {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid white;
}

/* Backgrounds */
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
  url('/assets/backgrounds/neurons_heating_up.jpg');
}
#hash_functions_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/neurons_heating_up.jpg');
}
#sha256_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/neurons_heating_up.jpg');
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
  url('/assets/backgrounds/blue_exploding.jpg');
}
#target_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/blue_exploding.jpg');
}
#pow_blockchain_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/blue_exploding.jpg');
}
#pow_mining_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/blue_exploding.jpg');
}

#timechain_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/transcending_forward.jpg');
}
#difficulty_adjustment_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/transcending_forward.jpg');
}
#timechain_blocks_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/transcending_forward.jpg');
}
#timechain_mining_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/transcending_forward.jpg');
}

#real_blocks_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/brain_man.jpg');
}
#real_mining_slide .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/brain_man.jpg');
}

#resources_section .fp-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/ultimate.jpg');
}

</style>
