<template>
  <div id="app">
    <full-page id="fullpage" :options="fullpageOptions" >

<!--      <IntroSection :contents="table_of_contents" />-->
<!--      <TermsSection/>-->
<!--      <BlockchainSection/>-->
<!--      <PowBlockchainSection/>-->
      <TimeChainSection/>
<!--      <HistoricalBlocksSection/>-->
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
    TimeChainSection,
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
        parallaxKey: '75EC2C59-580B47EA-8CE07EC3-BFC00055',
        parallaxOptions: {
          type: 'reveal',
          percentage: 62,
          property: 'translate',
        },
      },
      table_of_contents: [
        { anchor: 'intro', label: 'Intro' },
        {
          anchor: 'terms',
          label: 'Terms',
          slides: [
            { anchor: 'hexadecimal_notation', label: 'Hexadecimal Notation' },
            { anchor: 'hash_functions', label: 'Hash Functions (SHA-256)' },
          ],
        },
        {
          anchor: 'blockchain',
          label: 'Blockchain',
          slides: [
            { anchor: 'simple_blockchain', label: 'Non-Proof-of-Work' },
          ],
        },
        {
          anchor: 'pow',
          label: 'Proof-of-Work',
          slides: [
            { anchor: 'target', label: 'Target' },
            { anchor: 'pow_blockchain', label: 'Proof-of-Work Blockchain' },
          ],
        },
        {
          anchor: 'timechain',
          label: 'Timechain',
          slides: [
            { anchor: 'difficulty', label: 'Difficulty' },
            { anchor: 'hash_rate', label: 'Hash Rate' },
            { anchor: 'probability', label: 'Probability' },
          ],
        },
        { anchor: 'historical_blocks', label: 'Real Blocks' },
        { anchor: 'resources', label: 'Resources' },
      ],
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
    },
  },
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
  .blockchain_wrapper {
    text-align: center;
    max-height: 60vh;
    overflow-y: auto;
    scroll-behavior: smooth;
    padding: 0 10px;
  }

  /* Works on Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 12px;
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
    max-width: 625px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 30vh;
  }
  .list-group-item {
    background-color: inherit;
    border: none;
  }
  .list-field {
    padding-top: 7px;
    font-size: 0.875rem;
    padding-bottom: 0;
  }
  .list-value {
    padding-bottom: 7px;
    padding-top: 2px;
    border-bottom: 1px solid gray;
  }

  .card {
    margin: 0 auto 1em auto;
    background-color: rgba(0, 0, 0, 0.3);
    max-width: 625px;
    box-shadow: -2px 2px 5px 3px gray;
  }
  .card-header {
    background-color: #343a40;
    color: white;
    text-shadow: #000 0 0 5px;
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
  .fp-controlArrow.fp-prev{
    border-width: 16px 16px 16px 0;
  }
  .fp-controlArrow.fp-next {
    border-width: 16px 0 16px 16px;
  }
  #fp-nav ul li a span, .fp-slidesNav ul li a span {
    background-color: #f9f9fb;
  }
  .fp-slidesNav {
    transform: translate(50%,-50%);
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
    url('/assets/backgrounds/neurons2.jpg');
  }
  #hexadecimal_notation_slide .fp-bg {
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url('/assets/backgrounds/neurons_heating_up.jpg');
  }
  #hash_functions_slide .fp-bg {
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url('/assets/backgrounds/neurons3.jpg');
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
  #target_slide .fp-bg {
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url('/assets/backgrounds/brain_mushrooms.jpg');
  }
  #pow_blockchain_slide .fp-bg {
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url('/assets/backgrounds/transcending_forward.jpg');
  }
  #pow_graph_slide .fp-bg {
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url('/assets/backgrounds/transcending_forward.jpg');
  }
  #timechain_slide .fp-bg {
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url('/assets/backgrounds/brain_man.jpg');
  }
  #historical_blocks_section .fp-bg {
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url('/assets/backgrounds/ascension.jpg');
  }
  #resources_section .fp-bg {
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url('/assets/backgrounds/ultimate.jpg');
  }

</style>
