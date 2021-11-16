<template>
  <Page data-anchor="simple_blockchain" slide>
    <h1>Example: Non-Proof-of-Work Blockchain</h1>
    <p>
      This is a simplified version of a blockchain. The data
    </p>
    <p>
      Interactions:
      1. Change the data in one of the blocks and see how that block's hash changes. The change will propagate to all following blocks.
      2. Add a kk

    </p>

    <AddBlockButton :disable-add-block-btn="false"
                    v-on:add-block="addBlock"
                    v-on:reset-blocks="resetBlocks"/>
    <BlockCard v-for="(block, index) in this.blocks" :key="index"
               :block="block"
               :hex-digits="2"
               :index="index"
               showData
               v-on:finalize-block="finalizeBlock"
               v-on:update-data="updateData" />
  </Page>
</template>

<script>
import AddBlockButton from '@/components/controls/AddBlockButton.vue';
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import Page from '@/components/pages/Page.vue';
import UpdateDataMixin from '@/mixins/UpdateDataMixin';
import Block from '@/services/block/DemoBlock';
import BlockHeader from '@/services/block/DemoBlockHeader';

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
  methods: {
    async resetBlocks() {
      const block = new Block('', BlockHeader.genesis, 0, this.colors[0], 'inherit');
      await block.calcHash();
      this.blocks = [block];
      await this.addBlock('Bob sent Charlie 3$');
    },
  },
};
</script>
