<template>
  <Page data-anchor="historical_blocks">
    <h1>Historical Blocks</h1>
    <p>
      The 'data' in real Bitcoin blocks consists of the <b>Version</b> of the
      software used to create the block, a recording of the target called
      <b>Bits</b>, and a record of the transactions in the block called a <b>Merkle Root</b>.
      For more information on each field, see <a href="https://developer.bitcoin.org/reference/block_chain.html">developer.bitcoin.org/reference/block_chain.html</a>
    </p>

    <BlockCard :block="block"
               :hex-digits="64"
               showBlockHeightInput
               showReal
               showNonce
               v-on:solve-nonce="solveNonce"
               v-on:update-nonce="updateNonce"
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
import Page from '@/components/Page.vue';
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
      block: new Block('', BlockHeader.genesis, 0),
      mempool: new Mempool(),
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
      const id = await this.mempool.getLatestBlockHash();
      this.block = await this.mempool.getBlockById(id);
      this.blockHeightMax = this.block.height;
    },
  },
};
</script>
