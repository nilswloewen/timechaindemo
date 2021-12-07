<template>
<div id="blockchain_section" class="section">
  <Page slide data-anchor="blockchain">
    <h1>Blockchain</h1>

    <b-card no-body class="definition_card">
      <b-card-body>
        <h4 class="text-left">block (n.)</h4>
        <hr>
        <p>
          A set of data with a hash that 'locks' the data in place; you cannot
          change the data without changing the hash.
        </p>
        <hr>
        In Bitcoin a block stores a set of transactions.
      </b-card-body>
    </b-card>

    <b-card class="definition_card">
      <h4 class="text-left">blockchain (n.)</h4>
      <hr>
      <p>
        A data structure that embeds the hash of the previous blocks into the following block,
        therefore proving that the previous block existed before the following block which establishes an
        <b>Order of Events</b>.
      </p>
      <hr>
      <q>A blockchain is a chain of blocks.</q>
      &nbsp;&mdash;&nbsp;<a href="https://t.co/HQwDRlKKx9" target="_blank">Peter Todd</a>
    </b-card>

    <h4 class="mt-4">Why does Bitcoin use a blockchain?</h4>

    <p>
      A physical coin or asset requires no history, it exists in only one location at a time.
      Ownership is proven by physical control of the coin or asset.
    </p>

    <p>
      Because Bitcoin is not a physical asset, a ledger is used to keep track of
      who controls how much bitcoin.
    </p>

    <TldrCard>
      A blockchain is used to establish an order of events in the ledger <b>to prove that one
      transaction came before another</b>.
    </TldrCard>

    <hr>

    <p>
      The very first block in a blockchain is called the Genesis Block and starts at block number 0.
      Because new blocks are 'stacked on top' of old ones, the block number can also be thought of as
      the height or chain length.
    </p>

    <b-card class="definition_card">
      <h4><a href="https://www.etymonline.com/word/genesis" target="_blank">genesis (n.)</a></h4>
      <hr>
      Greek genesis "origin, creation, generation," from gignesthai "to be born," related to genos
      "race, birth, descent".
    </b-card>

    <p>
      Try changing the data or previous hash of the following block to see that the block hash changes.
    </p>

    <b-card id="example_block" no-body class="block_card" style="box-shadow: -1px 2px 5px 0 #14E3FD;">
      <b-card-header class="block_header" style="background-color: #14E3FD;" :key="blockHash">
        <b-container>
          <b-row>
            <b-col>
              <div class="text-left">Block #0</div>
            </b-col>
            <b-col>
              <div class="text-center">Hash</div>
            </b-col>
            <b-col class="text-right">(Genesis Block)</b-col>
          </b-row>
          <b-row>
            <b-col class="hash_wrapper text-left">
              <span class="hash_value valid"> {{ blockHash }} </span>
            </b-col>
          </b-row>
        </b-container>
      </b-card-header>

      <!--Data-->
      <div class="list label">Data</div>
      <div class="list value">
        <b-form-input @keyup="onExampleDataChange" :value="data" size="sm"/>
      </div>

      <!--Previous Hash-->
      <div class="list label">Previous Hash</div>
      <div class="list value">
        <b-form-input @keyup="onExamplePrevHashChange" :value="prevHash" size="sm"/>
      </div>
    </b-card>
  </Page>

  <Page data-anchor="simple_blockchain" slide>
    <h1>Simplified Blockchain</h1>

    <p>
      Add a few blocks to the blockchain and then change an old block to see how the change
      propagated up the chain.
    </p>

    <AddBlockButton :disable-add-block-btn="false"
                    :encoding="encoding[activeEncoding]"
                    v-on:rotate-encoding="rotateEncoding"
                    v-on:add-block="addBlock"
                    v-on:reset-blocks="resetBlocks"/>

    <div class="blockchain_wrapper">
      <BlockCard v-for="(block, index) in this.blocks" :key="index"
                 :block="block"
                 :index="index"
                 :local-encoding="encoding[activeEncoding]"
                 showData
                 v-on:rotate-encoding="rotateEncoding"
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
import { sha256dFromText } from '@/services/sha256_utils';
import TldrCard from '@/components/cards/TldrCard';

export default {
  mixins: [
    BlockchainMixin,
    EncodingMixin,
    TargetMixin
  ],
  components: {
    TldrCard,
    AddBlockButton,
    BlockCard,
    Page
  },
  data() {
    return {
      data: 'The Times 03/Jan/2009 Chancellor on brink of second bailout for banks',
      prevHash: ''.padEnd(64, '0'),
      blockHash: 'f87efc353bf272c57c8b8dcfae6e98e1ea1349dc70b8be4292f10fc6ffacc162'
    };
  },
  methods: {
    async onExampleDataChange(event) {
      this.data = event.target.value;
      this.blockHash = await sha256dFromText(this.data + this.prevHash);
    },
    async onExamplePrevHashChange(event) {
      this.prevHash = event.target.value;
      this.blockHash = await sha256dFromText(this.data + this.prevHash);
    }
  }
};
</script>

<style>
.fp-viewing-blockchain-blockchain .fp-controlArrow.fp-prev,
.fp-viewing-blockchain-simple_blockchain .fp-controlArrow.fp-next {
  display: none;
}

</style>
