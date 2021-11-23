<template>
  <div id="blockchain_section" class="section">
    <Page slide data-anchor="blockchain" fp_bg>
      <EncodingButton :active-encoding="activeEncoding" :encoding="encoding"
                      v-on:update-active-encoding="updateActiveEncoding"
                      v-on:rotate-encoding="rotateEncoding" />
      <h1>Blockchain</h1>

      <b-card>
        <h4 class="text-left">blockchain (n.)</h4>
        <hr>
        <q>A blockchain is a chain of blocks.</q>
        &nbsp;&mdash;&nbsp;<a href="https://t.co/HQwDRlKKx9" target="_blank">Peter Todd</a>
      </b-card>

      <p>
        A blockchain is a data structure that uses hashes to prove that previous
        blocks existed before following blocks, therefore establishing an <b>Order of Events</b>.
      </p>

      <p>
        In Bitcoin a block is a batch of recent transactions and some metadata
        about the block, such as the current time.
      </p>
    </Page>

    <Page data-anchor="simple_blockchain" slide fp_bg>
      <h1>Example: Non-Proof-of-Work Blockchain</h1>
      <p>
        This is a simplified version of a blockchain.
      </p>

      <AddBlockButton :disable-add-block-btn="false"
                      v-on:add-block="addBlock"
                      v-on:reset-blocks="resetBlocks"/>

      <div class="blockchain_wrapper">
        <BlockCard v-for="(block, index) in this.blocks" :key="index"
                   :block="block"
                   :hex-digits="2"
                   :index="index"
                   :local-encoding="encoding[activeEncoding]"
                   showData
                   v-on:update-data="updateData" />
      </div>
    </Page>
  </div>
</template>

<script>
import AddBlockButton from '@/components/controls/AddBlockButton.vue';
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import TargetMixin from '@/mixins/TargetMixin';
import Page from '@/components/Page.vue';
import UpdateDataMixin from '@/mixins/UpdateDataMixin';
import EncodingButton from '@/components/controls/EncodingButton';
import EncodingMixin from '@/mixins/EncodingMixin';

export default {
  mixins: [
    BlockchainMixin,
    EncodingMixin,
    TargetMixin,
    UpdateDataMixin,
  ],
  components: {
    AddBlockButton,
    BlockCard,
    EncodingButton,
    Page,
  },
};
</script>
