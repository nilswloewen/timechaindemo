<template>
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
                 showData
                 v-on:finalize-block="finalizeBlock"
                 v-on:update-data="updateData" />
    </div>

  </Page>
</template>

<script>
import AddBlockButton from '@/components/controls/AddBlockButton.vue';
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import Page from '@/components/Page.vue';
import UpdateDataMixin from '@/mixins/UpdateDataMixin';

export default {
  mixins: [
    BlockchainMixin,
    UpdateDataMixin,
  ],
  components: {
    AddBlockButton,
    BlockCard,
    Page,
  },
};
</script>
