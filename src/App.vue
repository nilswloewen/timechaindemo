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
        navigation: true,
        slidesNavigation: true,
        scrollingSpeed: 1000,
        scrollBar: false,
        scrollOverflow: true,
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
  }
  .blockchain_wrapper {
    text-align: center;
    max-height: 60vh;
    overflow-y: auto;
    scroll-behavior: smooth;
    padding-right: 20px;
  }
  .col {
    max-width: 625px;
    margin-left: auto;
    margin-right: auto;
  }
  .list-field {
    padding-top: 7px;
  }
  .list-value {
    font-size: 0.875rem;
    padding-bottom: 7px;
  }
  .card {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
    background-color: #f9f9fb;
    max-width: 625px;
    color: #15202b;
  }
  .card-header {
    background-color: #343a40;
    color: #f9f9fb;
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

</style>
