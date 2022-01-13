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
    TimeChainSection,
  },
  data() {
    return {
      fullpageOptions: {
        anchors: [],
        navigationTooltips: [],
        licenseKey: '',

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
        scrollOverflowResetKey: '',

        scrollHorizontally: true,
        scrollHorizontallyKey: '',
      },
      table_of_contents: [
        { anchor: 'intro', label: 'Intro' },
        {
          anchor: 'terms',
          label: 'Terms',
          slides: [
            { anchor: 'notation', label: 'Notation' },
            { anchor: 'hash_functions', label: 'Hash Functions' },
            { anchor: 'sha256', label: 'SHA-256' },
          ],
        },
        {
          anchor: 'blockchain',
          label: 'Blockchain',
          slides: [
            { anchor: 'simple_blockchain', label: 'Simple Example' },
          ],
        },
        {
          anchor: 'pow',
          label: 'Mining / Proof-of-Work',
          slides: [
            { anchor: 'target', label: 'Target' },
            { anchor: 'pow_blockchain', label: 'POW Blockchain' },
            { anchor: 'pow_mining', label: 'POW Mining' },
            { anchor: 'adjustable_target', label: 'POW Review' },
          ],
        },
        {
          anchor: 'timechain',
          label: 'Timechain',
          slides: [
            { anchor: 'difficulty_adjustment', label: 'Difficulty Adjustment' },
            { anchor: 'timechain_blockchain', label: 'Timechain' },
            { anchor: 'timechain_mining', label: 'Timechain Mining' },
            { anchor: 'real_world_hashrate', label: 'Real-World Hashrate' },
            { anchor: 'timechain_review', label: 'Timechain Review' },
          ],
        },
        {
          anchor: 'real_blocks',
          label: 'Historical Blocks',
          slides: [
            { anchor: 'real_mining', label: 'Real-World Mining' },
          ],
        },
        { anchor: 'resources', label: 'Resources' },
      ],
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
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira%20Code:wght@300..700&display=swap');

#app {
  -webkit-font-smoothing: antialiased;
  background-color: #15202b;
  color: white;
  font-family: 'Fira Code', monospace;
  font-size: 16px;
  text-align: justify;
  text-shadow: #000 -1px 1px 3px;
  scroll-behavior: smooth;
}

a {
  color: white;
  text-decoration: underline;
}

a:hover {
  color: #f79413;
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
  max-width: 588px;
  margin-left: auto;
  margin-right: auto;
}

.page_content {
  padding-top: 30vh;
  padding-bottom: 70vh;
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

.card.definition_card {
  box-shadow: -1px 2px 4px 2px #6471F7;
  border-color: #6471F7;
}

.card.quote_card {
  box-shadow: -1px 2px 4px 2px #A01CF2;
  border-color: #A01CF2;
}

.nav_btn {
  margin: 0.5em;
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

#simple_blockchain_slide .prev_block_hash,
#simple_blockchain_slide .hash_value,
#pow_blockchain_slide .prev_block_hash,
#pow_blockchain_slide .hash_value,
#timechain_blocks_slide .prev_block_hash,
#timechain_blocks_slide .hash_value {
  padding: 4px;
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

.card-header.block_header {
  text-align: center;
  padding: 12px 0 0 0;
  line-height: 1em;
  display: flex;
  font-weight: normal;
}

.hash_wrapper {
  margin-top: 4px;
  padding-bottom: 2px;
  word-wrap: normal;
  overflow: auto;
  line-height: 1.2em;
  border: 0;
}

.blockchain_wrapper {
  padding: 0 4px;
  text-align: center;
}

.nav_btn,
.nav_btn:focus {
  background-color: transparent;
  border-color: #7855F5;
  box-shadow: -2px 3px 5px 0 #7855F5;
}

.nav_btn:hover {
  background-color: #7855F5;
  border-color: #7855F5;
}
</style>
