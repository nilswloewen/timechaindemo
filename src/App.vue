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
  <b-card id="phone_msg">
    This demo is currently not pretty enough to be shown on small devices. Please use a larger screen.
  </b-card>
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

        scrollingSpeed: 1500,
        scrollBar: false,
        scrollOverflow: true,

        autoScrolling: true,
        keyboardScrolling: false,

        navigation: true,
        slidesNavigation: true,
        slidesNavPosition: 'top',
        normalScrollElements: '.blockchain_wrapper .value .page_content',

        scrollOverflowReset: true,
        scrollOverflowResetKey: 'bmlsc2xvZXdlbi5jb21fVVFuYzJOeWIyeHNUM1psY21ac2IzZFNaWE5sZEE9PVUyRw==',

        scrollHorizontally: true,
        scrollHorizontallyKey: 'bmlsc2xvZXdlbi5jb21fV08zYzJOeWIyeHNTRzl5YVhwdmJuUmhiR3g1MjZ2'
      },
      table_of_contents: [
        { anchor: 'intro', label: 'Intro' },
        {
          anchor: 'terms',
          label: 'Terms',
          slides: [
            { anchor: 'notation', label: 'Notation' },
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
            { anchor: 'timechain_mining', label: 'Timechain Mining' },
            { anchor: 'global_hashrate', label: 'Global Hashrate' }
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
  color: inherit;
}

/* Scrollbars */
*::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

*::-webkit-scrollbar-track,
.iScrollIndicator {
  background: none !important;
}

*::-webkit-scrollbar-thumb {
  background-color: #17a2b8;
  border-radius: 20px;
  border: 3px solid #17a2b8;
}

.col {
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;
}

.page_content {
  padding-top: 30vh;
  padding-bottom: 90vh;
}

.card {
  margin: 0 auto 2em auto;
  background-color: rgba(0, 0, 0, 0.3);
  max-width: 625px;
  box-shadow: -2px 3px 10px 2px rgba(255, 255, 255, 0.2);
}

.card-header {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-weight: bold;
  padding: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.card-header svg {
  filter: drop-shadow(-2px 2px 2px black);
}

.card.tldr_card {
  box-shadow: -1px 2px 4px 2px #f79413;
  border-color: #f79413;
}
.card.info_card {
  box-shadow: -1px 2px 4px 2px #17a2b8;
  border-color: #17a2b8;
}
.card.tool_card {
  box-shadow: -1px 2px 4px 2px rgba(255, 255, 255, 0.4);
  border-color: rgba(255, 255, 255, 0.4);
}
.card.definition_card {
  box-shadow: -1px 2px 4px 2px #6471F7;
  border-color: #6471F7;
}
.card.quote_card {
  box-shadow: -1px 2px 4px 2px #A01CF2;
  border-color: #A01CF2;
}
/* Encoding Btn */
.popover {
  border-color: white;
  box-shadow: -1px 2px 4px 2px white;
}

.nav_btn {
  margin: 2em;
}
.nav_btn_mining_wrapper {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
}

.blockchain_wrapper {
  margin-top: 2em;
  text-align: center;
}
.prev_block_hash {
  padding:  2px;
}

#simple_blockchain_slide .prev_block_hash,
#simple_blockchain_slide .hash_value ,
#pow_blockchain_slide .prev_block_hash,
#pow_blockchain_slide .hash_value,
#timechain_blocks_slide .prev_block_hash,
#timechain_blocks_slide .hash_value {
  padding:  4px;
  font-weight: bold;
  font-size: 1em;
}

#simple_blockchain_slide .prev_block_hash,
#pow_blockchain_slide .prev_block_hash,
#timechain_blocks_slide .prev_block_hash {
  padding: 0 2px;
}

#simple_blockchain_slide .hash_wrapper,
#pow_blockchain_slide .hash_wrapper,
#timechain_blocks_slide .hash_wrapper {
  line-height: 2em;
}
#simple_blockchain_slide .prev_block_hash_wrapper,
#pow_blockchain_slide .prev_block_hash_wrapper,
#timechain_blocks_slide .prev_block_hash_wrapper {
  text-align: center;
}

.hash_value {
  font-size: 0.875rem;
}
.invalid {
  border-radius: 4px;
  background-color: #b72919;
}

.card-header.block_header {
  text-align: center;
  padding: 12px 0 0 0;
  line-height: 1em;
  display: flex;
  font-weight: normal;
}

.card-header.block_header .col {
  padding-left: 5px;
  padding-right: 5px;
}

.hash_wrapper {
  margin-top: 4px;
  padding-bottom: 2px;
  word-wrap: normal;
  overflow: auto;
  line-height: 1.2em;
  border: 0;
}
.block_number {
  font-weight: bold;
}


.add_block_wrapper,
.blockchain_wrapper {
  padding: 0 4px;
  text-align: center;
}

.list {
  text-align: left;
  background-color: transparent;
  border: none;
  font-size: 0.875rem;
  padding: 0 5px;
}

.list.label {
  padding-top: 7px;
  padding-bottom: 0;
  font-weight: bold;
}

.list.value {
  overflow-x: auto;
  word-wrap: normal;
  padding-bottom: 7px;
  padding-top: 2px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card .value:last-child {
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

.icon_btn {
  cursor: pointer;
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
  box-shadow: -2px 3px 10px 2px #7855F5;
  border-color: #7855F5;
}

.collapse_mining_controls,
.rotate_encoding_btn {
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: -2px 3px 10px 2px rgba(255, 255, 255, 0.1);
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


/*
 * FullPage Controls
 */
#fp-nav ul li {
  margin: 10px 0;
}
#fp-nav ul li .fp-tooltip {
  font-family: 'Fira Code', monospace;
}
#fp-nav ul li a span, .fp-slidesNav ul li a span {
  background-color: white;
}

/* Slides Arrows on bottom third */
.fp-controlArrow {
  display: none;
}
#fp-nav ul li .active + .fp-tooltip {
  font-weight: bold;
}

#fp-nav ul:hover .fp-tooltip {
  right: 20px;
  transition: opacity 0.2s ease-in;
  width: auto;
  opacity: 1;
}

/* Left Arrow */
.fp-controlArrow.fp-prev {
  border-width: 16px 16px 16px 0;
}

/* Right Arrow */
.fp-controlArrow.fp-next {
  border-width: 16px 0 16px 16px;
}

/* Nav dots on right */
#fp-nav.fp-right {
  top: 33%;
}

.fp-slidesNav {
  transform: translate(46%, -50%);
}

/* Nav dots on right */
@media only screen and (max-width: 600px) {
  /* Nav dots on right */
  #fp-nav.fp-right {
    right: -6px;
  }
  /* Left Arrow */
  .fp-controlArrow.fp-prev {
    border-width: 10px 10px 10px 0;
    left: 4px;
  }

  /* Right Arrow */
  .fp-controlArrow.fp-next {
    border-width: 10px 0 10px 10px;
    right: 4px;
  }

  /* Make nav dots smaller */
  #fp-nav ul li a span, .fp-slidesNav ul li a span {
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

}

/* Backgrounds */
.fp-bg,
.section {
  background-size: cover;
  background-position: center;
}

#intro_section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/small_brain.jpg');
}

#terms_section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/neurons_heating_up.jpg');
}

#blockchain_section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/brain_black.webp');
}

#pow_section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/blue_exploding.jpg');
}

#timechain_section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/transcending_forward.jpg');
}

#historical_blocks_section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/brain_man.jpg');
}

#resources_section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/ultimate.jpg');
}

@media only screen and (max-width: 750px) {
  #fullpage {
    display: none;
  }
}

</style>
