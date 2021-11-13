<template>
  <Page data-anchor="historical_blocks">
    <h1>Historical Blocks</h1>

    <BlockCard :block="block"
               :hex-digits="64"
               showBlockHeightInput
               showNonce
               showMerkle
               v-on:solveNonce="solveNonce"
               v-on:updateNonce="updateNonce"
               v-on:update-block-height="updateBlockHeight"
               v-on:update-block-height-latest="updateBlockHeightLatest"/>
  </Page>
</template>

<script>
import Block from '@/services/block/Block';
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockHeader from '@/services/block/BlockHeader';
import HashesPerSecondMixin from '@/mixins/HashesPerSecondMixin';
import Mempool from '@/services/Mempool';
import NonceMixin from '@/mixins/NonceMixin';
import Page from '@/components/pages/Page.vue';
import TargetMixin from '@/mixins/TargetMixin';
import UpdateDataMixin from '@/mixins/UpdateDataMixin';
import UpdateHexDigitsMixin from '@/mixins/UpdateHexDigitsMixin';

export default {
  mixins: [
    HashesPerSecondMixin,
    NonceMixin,
    TargetMixin,
    UpdateDataMixin,
    UpdateHexDigitsMixin,
  ],
  components: {
    BlockCard,
    Page,
  },
  data() {
    return {
      mempool: new Mempool(),
      block: new Block('', BlockHeader.genesis, 0),
    };
  },
  async mounted() {
    await this.block.calcHash();
  },
  methods: {
    async updateNonce(nonce) {
      this.block.header.nonce = nonce;
    },
    async solveNonce() {
      await this.block.calcHash();
    },
    async updateBlockHeight(height) {
      const id = await this.mempool.getBlockIdFromHeight(height);
      this.block = await this.mempool.getBlockById(id);
    },

    async updateBlockHeightLatest() {
      const height = await this.mempool.getHeightOfLatestBlock();
      this.blockHeightMax = height;
      await this.updateBlockHeight(height);
    },
  },
};
</script>
