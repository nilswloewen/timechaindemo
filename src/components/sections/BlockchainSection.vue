<template>
<div id="blockchain_section" class="section">
  <Page slide data-anchor="blockchain">
    <h1>Blockchain</h1>

    <b-card no-body>
      <b-card-body>
        <h4 class="text-left">block (n.)</h4>
        <hr>
        <p>
          A set of data with a hash that 'locks' the data in place; you cannot
          change the data without changing the hash.
        </p>

      </b-card-body>
    </b-card>

    <b-card>
      <h4 class="text-left">blockchain (n.)</h4>
      <hr>
      <p>
        A data structure that embeds the hash of the previous blocks into the following block,
        therefore proving that the previous block existed before the following which establishes an
        <b>Order of Events</b>.
      </p>
      <hr>
      <q>A blockchain is a chain of blocks.</q>
      &nbsp;&mdash;&nbsp;<a href="https://t.co/HQwDRlKKx9" target="_blank">Peter Todd</a>
    </b-card>

    <h4 class="mt-4">Why does Bitcoin use a blockchain?</h4>

    <p>
      A physical coin or asset requires no history, it exists in only location at a time.
      Ownership is proven by physical control of the coin or asset.
    </p>

    <p>
      Because Bitcoin is not a physical asset, a ledger is used to keep track of
      who controls how much bitcoin.
    </p>

    <p>
      A blockchain is used to establish an order of events in the ledger to prove that one
      transaction came before another.
    </p>
  </Page>

  <Page data-anchor="simple_blockchain" slide
        encoding-btn
        :active-encoding="activeEncoding"
        v-on:rotate-encoding="rotateEncoding"
        v-on:update-active-encoding="updateActiveEncoding">

    <h1>Simplified Blockchain</h1>

    <p>
      For this demo we will start by only looking at the first 2 digits of the hash of each block.
    </p>
    <p style="font-size: 0.875rem; text-align: center;">
      <b>XX</b>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    </p>

    <hr>

    <p>
      Add a few blocks to the blockchain and then change an old block to see how the change
      propagated up the chain.
    </p>

    <AddBlockButton :disable-add-block-btn="false"
                    v-on:rotate-encoding="rotateEncoding"
                    v-on:add-block="addBlock"
                    v-on:reset-blocks="resetBlocks"/>

    <div class="blockchain_wrapper">
      <BlockCard v-for="(block, index) in this.blocks" :key="index"
                 :block="block"
                 :hex-digits="2"
                 :index="index"
                 :local-encoding="encoding[activeEncoding]"
                 showData
                 v-on:update-data="updateData"/>
    </div>
  </Page>
</div>
</template>

<script>
import AddBlockButton from '@/components/controls/AddBlockButton.vue';
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import EncodingMixin from '@/mixins/EncodingMixin';
import TargetMixin from '@/mixins/TargetMixin';
import Page from '@/components/Page.vue';
import EncodingButton from '@/components/controls/EncodingButton';

export default {
  mixins: [
    BlockchainMixin,
    EncodingMixin,
    TargetMixin
  ],
  components: {
    AddBlockButton,
    BlockCard,
    EncodingButton,
    Page
  }
};
</script>

<style>
.fp-viewing-blockchain-blockchain .fp-controlArrow.fp-prev,
.fp-viewing-blockchain-simple_blockchain .fp-controlArrow.fp-next {
  display: none;
}
</style>
