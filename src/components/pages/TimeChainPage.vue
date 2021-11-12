<template>
  <div class="section">
    <Page data-anchor="timechain" slide>
      <h1>Timechain</h1>

      <Difficulty :hps-of-this-device="hpsOfThisDevice" :avg-hashes="avgHashes()"
                  v-on:calibrate-hps="calibrateHps"/>
      <AddBlockButton :disable-add-block-btn="disableAddBlockBtn"
                      v-on:add-block="addBlock"
                      v-on:reset-blocks="resetBlocks"/>
      <BlockCard v-for="(block, index) in this.blocks" :key="index"
                 :block="block"
                 :hex-digits="hexDigits"
                 :index="index"
                 showData
                 showNonce
                 v-on:finalizeBlock="finalizeBlock"
                 v-on:updateData="updateData"
                 v-on:updateNonce="updateNonce"
                 v-on:solveNonce="solveNonce" />
    </Page>
  </div>
</template>

<script>
import Page from '@/components/pages/Page.vue';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import AddBlockButton from '@/components/AddBlockButton.vue';
import HashesPerSecondMixin from '@/mixins/HashesPerSecondMixin';
import Difficulty from '@/components/controls/Difficulty.vue';
import BlockCard from '@/components/cards/BlockCard.vue';

export default {
  mixins: [
    BlockchainMixin,
    HashesPerSecondMixin,
  ],
  components: {
    AddBlockButton,
    BlockCard,
    Difficulty,
    Page,
  },
  data() {
    return {
      hexDigits: 2,
    };
  },
};
</script>
