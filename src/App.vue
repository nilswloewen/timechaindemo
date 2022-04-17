<template>
<div id="app">
  <full-page id="fullpage" :options="fullpageOptions">
    <TermsSection/>
    <BlockchainSection/>
    <PowBlockchainSection/>
    <TimeChainSection/>
    <RealMiningSection/>
    <ResourcesSection/>
  </full-page>
</div>
</template>

<script>
import BlockchainSection from '@/components/sections/BlockchainSection.vue';
import RealMiningSection from '@/components/sections/RealMining.vue';
import IntroSection from '@/components/sections/IntroSection.vue';
import PowBlockchainSection from '@/components/sections/PowBlockchainSection.vue';
import ResourcesSection from '@/components/sections/ResourcesSection.vue';
import TermsSection from '@/components/sections/TermsSection.vue';
import TimeChainSection from '@/components/sections/TimeChainSection.vue';

export default {
  name: 'app',
  components: {
    BlockchainSection,
    IntroSection,
    PowBlockchainSection,
    RealMiningSection,
    ResourcesSection,
    TermsSection,
    TimeChainSection,
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
        normalScrollElements: '.container .blockchain_wrapper .value .page_content',

        scrollOverflowReset: true,
        scrollOverflowResetKey: 'dGltZWNoYWluZGVtby5pb19VTW5jMk55YjJ4c1QzWmxjbVpzYjNkU1pYTmxkQT09T0to',

        scrollHorizontally: true,
        scrollHorizontallyKey: 'dGltZWNoYWluZGVtby5pb19VeFFjMk55YjJ4c1NHOXlhWHB2Ym5SaGJHeDVFTUs=',
      },
    };
  },
};
</script>
