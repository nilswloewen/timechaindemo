<template>
  <div class="section">
    <Page data-anchor="historical_timechain" slide>
      <h1>Historical Timechain</h1>
      <Complexity :initial-hex-digits="2" v-on:update-hex-digits="updateHexDigits"/>

      <Target :initial-target="initialTarget" :max="this.targetMax"
              v-on:updateTarget="updateTarget"/>
      <Difficulty :hps-of-this-device="hpsOfThisDevice" :avg-hashes="avgHashes()"
                  v-on:calibrate-hps="calibrateHps"/>
      <AddBlockButton :disable-add-block-btn="disableAddBlockBtn"
                      v-on:add-block="addBlock"
                      v-on:reset-blocks="resetBlocks"/>
      <BlockCard v-for="(block, index) in this.blocks" :key="index"
                 :block="block"
                 :hex-digits="hexDigits"
                 :index="index"
                 showBlockHeightInput
                 showNonce
                 v-on:finalizeBlock="finalizeBlock"
                 v-on:solveNonce="solveNonce"
                 v-on:updateData="updateData"
                 v-on:updateNonce="updateNonce" />
    </Page>
  </div>
</template>

<script>
import AddBlockButton from '@/components/controls/AddBlockButton.vue';
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import Complexity from '@/components/controls/Complexity.vue';
import Difficulty from '@/components/controls/Difficulty.vue';
import HashesPerSecondMixin from '@/mixins/HashesPerSecondMixin';
import Mempool from '@/services/Mempool';
import NonceMixin from '@/mixins/NonceMixin';
import Page from '@/components/pages/Page.vue';
import Target from '@/components/controls/Target.vue';
import TargetMixin from '@/mixins/TargetMixin';
import UpdateDataMixin from '@/mixins/UpdateDataMixin';
import UpdateHexDigitsMixin from '@/mixins/UpdateHexDigitsMixin';

export default {
  mixins: [
    BlockchainMixin,
    HashesPerSecondMixin,
    NonceMixin,
    TargetMixin,
    UpdateDataMixin,
    UpdateHexDigitsMixin,
  ],
  components: {
    AddBlockButton,
    BlockCard,
    Complexity,
    Difficulty,
    Page,
    Target,
  },
  data() {
    return {
      mempool: new Mempool(),
    };
  },
  methods: {
    async getBlock(height) {
      const id = await this.mempool.getBlockIdFromHeight(height);
      this.block = await this.mempool.getBlockById(id);

      this.setBlockList();
      this.$emit('updateBlock', this.block);
    },

    async onBlockHeightChange(height) {
      await this.getBlock(height);
    },

    async onLatest() {
      const height = await this.mempool.getHeightOfLatestBlock();
      this.blockHeightMax = height;
      await this.getBlock(height);
    },
  },
};
</script>
