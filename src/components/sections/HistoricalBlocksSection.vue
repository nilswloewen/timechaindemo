<template>
<div class="section">
  <Page data-anchor="historical_blocks" slide
        encoding-btn
        :active-encoding="activeEncoding"
        :encoding="encoding"
        v-on:rotate-encoding="rotateEncoding"
        v-on:update-active-encoding="updateActiveEncoding">
    <h1>Historical Blocks</h1>
    <p>
      The 'data' in real Bitcoin blocks consists of the <b>Version</b> of the
      software used to create the block, a recording of the target called
      <b>Bits</b>, and a record of the transactions in the block called a <b>Merkle Root</b>.
      For more information on each field, see <a href="https://developer.bitcoin.org/reference/block_chain.html">developer.bitcoin.org/reference/block_chain.html</a>
    </p>

    <BlockCard :block="block"
               :hex-digits="64"
               :local-encoding="encoding[activeEncoding]"
               showBlockHeightInput
               showReal
               showNonce
               v-on:update-block-height="updateBlockHeight"
               v-on:update-block-height-latest="updateBlockHeightLatest"/>

  </Page>
</div>
</template>

<script>
import Block from '@/services/block/Block';
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockHeader from '@/services/block/BlockHeader';
import EncodingButton from '@/components/controls/EncodingButton';
import EncodingMixin from '@/mixins/EncodingMixin';
import Mempool from '@/services/Mempool';
import Page from '@/components/Page.vue';
import TargetMixin from '@/mixins/TargetMixin';

export default {
  mixins: [
    EncodingMixin,
    TargetMixin
  ],
  components: {
    BlockCard,
    EncodingButton,
    Page
  },
  data() {
    return {
      block: new Block('', BlockHeader.genesis, 0),
      mempool: new Mempool(),
      encoding: ['binary', 'decimal', 'hexadecimal', 'exponential']
    };
  },
  async mounted() {
    await this.block.calcHash();
  },
  methods: {
    async updateNonce(nonce) {
      this.block.header.nonce = nonce;
    },
    async updateBlockHeight(height) {
      const id = await this.mempool.getBlockIdFromHeight(height);
      this.block = await this.mempool.getBlockById(id);
    },

    async updateBlockHeightLatest() {
      const id = await this.mempool.getLatestBlockHash();
      this.block = await this.mempool.getBlockById(id);
      await this.block.calcHash();
      this.blockHeightMax = this.block.height;
    }
  }
};
</script>
