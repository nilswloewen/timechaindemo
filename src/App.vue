<template>
  <div id="app">
    <full-page id="fullpage" :options="fullpageOptions" >

      <IntroPage :contents="contents" />
      <TermsPage/>
      <Blockchain/>
      <PowBlockchainPage/>
      <TimeChainPage/>
      <HistoricalBlocksPage/>
      <ResourcesPage/>

    </full-page>
  </div>
</template>

<script>
import Blockchain from '@/components/pages/chains/BlockchainPage.vue';
import HistoricalBlocksPage from '@/components/pages/chains/HistoricalBlocksPage.vue';
import IntroPage from '@/components/pages/IntroPage.vue';
import PowBlockchainPage from '@/components/pages/chains/PowBlockchainPage.vue';
import ResourcesPage from '@/components/pages/ResourcesPage.vue';
import TermsPage from '@/components/pages/terms/TermsPage.vue';
import TimeChainPage from '@/components/pages/chains/TimeChainPage.vue';

export default {
  name: 'app',
  components: {
    Blockchain,
    HistoricalBlocksPage,
    IntroPage,
    PowBlockchainPage,
    ResourcesPage,
    TermsPage,
    TimeChainPage,
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
        slidesNavigation: true,
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
      contents: [
        { anchor: 'intro', color: '#15202b' },
        {
          anchor: 'terms',
          color: '#ff5f45',
          slides: [
            { anchor: 'hexadecimal_notation' },
            { anchor: 'hash_functions' },
          ],
        },
        {
          anchor: 'blockchain',
          color: '#0798ec',
          slides: [
            { anchor: 'simple_blockchain' },
          ],
        },
        {
          anchor: 'proof-of-work',
          color: '#fec401',
          slides: [
            { anchor: 'target' },
            { anchor: 'pow_blockchain' },
          ],
        },
        {
          anchor: 'timechain',
          color: '#1bcee6',
          slides: [
            { anchor: 'difficulty' },
            { anchor: 'hash_rate' },
            { anchor: 'probability' },
          ],
        },
        { anchor: 'historical_blocks', color: '#ee1a59' },
        { anchor: 'resources', color: '#ee1a59' },
      ],
    };
  },
  mounted() {
    this.addAnchorsToFullpage();
    this.moveToUrl();
  },
  methods: {
    addAnchorsToFullpage() {
      this.contents.forEach((section) => {
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
    text-shadow: #000 0 0 2px;
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
  }
  .list-group-item {
    background-color: inherit;
    border: none;
  }
  .list-field {
    padding-top: 7px;
  }
  .list-value {
    font-size: 0.875rem;
    padding-bottom: 7px;
    border-bottom: 1px solid gray;
  }

  .card {
    margin: 0 auto 1em auto;
    background-color: #15202b;
    max-width: 625px;
    box-shadow: 0 0 4px 2px gray;
  }
  .card-header {
    background-color: #343a40;
    color: white;
  }

  .table {
    margin-bottom: 0;
  }
  tr {
    background-color: transparent;
  }

  hr {
    margin: .5em 0;
  }
  .form-control,
  .form-control:disabled, .form-control[readonly],
  .input-group-text {
    background-color: inherit;
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

  .section:nth-of-type(2):before,
  .section:nth-of-type(4):before {
    content: '';
    position: absolute;
    display: block;
    background: rgba(173, 173, 173, 0.2);
    top:0;
    bottom:0;
    height: 100%;
    width: 100%;
  }
  .section {
    background-size: cover;
    transform: translate3d(0,0,0);
    -webkit-backface-visibility: hidden; /* Chrome, Safari, Opera */
    backface-visibility: hidden;
    background-position: center;
  }
  /* Intro */
  .section:nth-of-type(2) {
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('/assets/backgrounds/small_brain.jpg');
  }
  /* Terms */
  .section:nth-of-type(3) {
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('/assets/backgrounds/neurons_heating_up.jpg');
  }
  /* Blockchain */
  .section:nth-of-type(4) {
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('/assets/backgrounds/brain_black.webp');
  }
  /* Proof-of-work */
  .section:nth-of-type(5) {
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('/assets/backgrounds/brain_mushrooms.jpg');
  }
  /* Timechain */
  .section:nth-of-type(6) {
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('/assets/backgrounds/brain_man.jpg');
  }
  /* Real Blocks */
  .section:nth-of-type(7) {
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('/assets/backgrounds/ultimate.jpg');
  }

</style>
