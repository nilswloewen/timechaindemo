<template>
  <div id="app">
    <full-page id="fullpage" :options="fullpageOptions" >

      <IntroPage :contents="contents" />

      <TermsPage/>
      <Blockchain/>
      <PowBlockchainPage/>
      <TimeChainPage/>
      <ResourcesPage/>

    </full-page>
  </div>
</template>

<script>
import Blockchain from '@/components/pages/BlockchainPage.vue';
import IntroPage from '@/components/pages/IntroPage.vue';
import PowBlockchainPage from '@/components/pages/PowBlockchainPage.vue';
import ResourcesPage from '@/components/pages/ResourcesPage.vue';
import TermsPage from '@/components/pages/TermsPage.vue';
import TimeChainPage from '@/components/pages/TimeChainPage.vue';

export default {
  name: 'app',
  components: {
    Blockchain,
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
        licenseKey: '75EC2C59-580B47EA-8CE07EC3-BFC00055',
        navigation: true,
        scrollBar: false,
        scrollOverflow: true,
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
            { anchor: 'simple' },
          ],
        },
        {
          anchor: 'proof-of-work',
          color: '#fec401',
          slides: [
            { anchor: 'target' },
            { anchor: 'pow_blockchain' },
            { anchor: 'complexity' },
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
  .card {
    background-color: #f9f9fb;
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
