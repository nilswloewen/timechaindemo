<template>
  <Page data-anchor="simple_blockchain" slide>
    <h1>Simple Blockchain</h1>
    <AddBlockButton :disable-add-block-btn="false"
                    v-on:add-block="addBlock"
                    v-on:reset-blocks="resetBlocks"/>
    <BlockCard v-for="(block, index) in this.blocks" :key="index"
               :block="block"
               :index="index"
               :hex-digits="2"
               showData
               v-on:finalizeBlock="finalizeBlock"
               v-on:updateData="updateData" />
  </Page>
</template>

<script>
import AddBlockButton from '@/components/controls/AddBlockButton.vue';
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import Page from '@/components/pages/Page.vue';
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
