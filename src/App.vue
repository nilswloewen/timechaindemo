<template>
  <div id="app">
    <full-page id="fullpage" :options="fullpageOptions" >

      <IntroPage :contents="contents" />

      <TermsPage/>
      <Blockchain/>
      <TimeChainPage/>
      <MiningPage/>
      <ResourcesPage/>

    </full-page>
  </div>
</template>

<script>
import Blockchain from '@/components/pages/BlockchainPage.vue';
import IntroPage from '@/components/pages/IntroPage.vue';
import MiningPage from '@/components/pages/MiningPage.vue';
import ResourcesPage from '@/components/pages/ResourcesPage.vue';
import TermsPage from '@/components/pages/TermsPage.vue';
import TimeChainPage from '@/components/pages/TimeChainPage.vue';

export default {
  name: 'app',
  components: {
    Blockchain,
    IntroPage,
    MiningPage,
    ResourcesPage,
    TermsPage,
    TimeChainPage,
  },
  data() {
    return {
      fullpageOptions: {
        licenseKey: '2C8168FC-415648B7-B94C4003-80F51EAC',
        scrollBar: false,
        afterLoad: this.afterLoad,
        navigation: true,
        anchors: [],
        sectionsColor: [],
      },
      contents: [
        { anchor: 'intro', color: '#41b883' },
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
            { anchor: 'proof-of-work' },
          ],
        },
        { anchor: 'mining', color: '#fec401' },
        {
          anchor: 'timechain',
          color: '#1bcee6',
          slides: [
            { anchor: 'hash_rate' },
            { anchor: 'probability' },
            { anchor: 'difficulty' },
            { anchor: 'difficulty_adjustment' },
          ],
        },
        { anchor: 'resources', color: '#ee1a59' },
      ],
    };
  },
  mounted() {
    this.addAnchorsToFullpage();
  },
  methods: {
    addAnchorsToFullpage() {
      this.contents.forEach((section) => {
        this.fullpageOptions.anchors.push(section.anchor);
        this.fullpageOptions.sectionsColor.push(section.color);
      });
    },
  },
};
</script>

<style>
  .section {
    position: relative;
  }

  h3 {
    color: #fff;
    font-size: 5em;
    font-weight: 700;
    text-align: center;
  }

</style>
