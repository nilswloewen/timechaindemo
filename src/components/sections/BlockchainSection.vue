<template>
<div id="blockchain_section" class="section">
  <Page data-anchor="blockchain" first prev-section-btn slide>
    <h1>Blockchain</h1>

    <b-card class="definition_card" no-body>
      <b-card-body>
        <h4 class="text-left">block (n.)</h4>
        <hr>
        <p>
          A set of data with a hash that 'locks' the data in place; you cannot
          change the data without changing the hash.
        </p>
        <hr>
        In Bitcoin a block stores a set of transactions.
        <hr>
        <div class="text-center">
          <img alt="Blockchain" class="card-img" height="112" src="/assets/block.svg" width="209"/>
        </div>
      </b-card-body>
    </b-card>

    <b-card class="definition_card">
      <h4 class="text-left">blockchain (n.)</h4>
      <hr>
      <p>
        A data structure that embeds the hash of the previous block into the following block,
        therefore proving that the previous block existed before the following which establishes an
        <b>Order of Events</b>.
      </p>
      <hr>
      <img alt="Blockchain" class="card-img" height="113" src="/assets/blockchain.svg" width="516"/>
    </b-card>

    <h4 class="mt-4">Why does Bitcoin use a blockchain?</h4>

    <p>
      A physical coin or asset requires no history, it can only exist in one location at a time.
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
      The first block in a blockchain is called the Genesis Block and starts at block number 0.
      Because new blocks are 'stacked on top' of old ones, the block number can also be thought of as
      the block height.
    </p>

    <b-card class="definition_card">
      <h4>
        <Link href="https://www.etymonline.com/word/genesis">genesis (n.)</Link>
      </h4>
      <hr>
      Greek genesis "origin, creation, generation," from gignesthai "to be born," related to genos
      "race, birth, descent".
    </b-card>

    <hr>

    <h2>Example Block</h2>

    <p>
      Try changing the data or previous hash of the following block to see that the block hash changes.
    </p>

    <b-card id="example_block" class="block_card" no-body
            style="box-shadow: -1px 2px 5px 0 #14E3FD; border-color: #14E3FD">
      <b-card-header :key="blockHash" class="block_header">
        <b-container>
          <b-row>
            <b-col class="text-left"><b>Block #0</b></b-col>
            <b-col class="text-center"> Hash</b-col>
            <b-col class="text-right">(Genesis Block)</b-col>
          </b-row>
          <b-row>
            <b-col class="hash_wrapper text-left">
              <span class="hash_value"> {{ blockHash }} </span>
            </b-col>
          </b-row>
        </b-container>
      </b-card-header>

      <!--Data-->
      <div class="list label">Data</div>
      <div class="list value">
        <b-form-input id="example_data_input" :value="data" size="sm" @keyup="onExampleDataChange"/>
      </div>

      <!--Previous Hash-->
      <div class="list label">Previous Block Hash</div>
      <div class="list value">
        <b-form-input id="example_prev_hash_input"
                      :value="prevHash" size="sm" @keyup="onExamplePrevHashChange"/>
      </div>
    </b-card>
  </Page>

  <Page data-anchor="simple_blockchain" last next-section-btn slide>
    <h1>Simplified Blockchain</h1>

    <p>
      For this demo we will start by looking at the only first 2 digits of the hash of each block.
    </p>
    <p style="font-size: 0.875rem; text-align: center;">
      <b>XX</b>{{ ''.padEnd(62, 'x') }}
    </p>

    <hr>

    <div class="d-flex mb-2">
      <SimpleBlockchainTour/>
      Try change the data of block #1 and watch see how the change propagates up the chain.
    </div>

    <div class="blockchain_wrapper">
      <AddBlockButton
        :disable-add-block-btn="false"
        :encoding="encoding[activeEncoding]"
        v-on:add-block="addBlock"
        v-on:reset-blocks="resetBlocks"/>

      <BlockCard
        v-for="(block, index) in this.blocks"
        :key="index" :block="block"
        :index="index"
        :local-encoding="encoding[activeEncoding]"
        showData
        type="simple"
        v-on:rotate-encoding="rotateEncoding"
        v-on:update-data="updateData"/>
    </div>
  </Page>
</div>
</template>

<script>
import BlockCard from '@/components/cards/BlockCard.vue';
import TldrCard from '@/components/cards/TldrCard';
import AddBlockButton from '@/components/controls/AddBlockButton.vue';
import Link from '@/components/Link';
import Page from '@/components/Page.vue';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import EncodingMixin from '@/mixins/EncodingMixin';
import TargetMixin from '@/mixins/TargetMixin';
import { sha256dFromText } from '@/services/sha256_utils';
import SimpleBlockchainTour from '@/components/tours/SimpleBlockchainTour';

export default {
  mixins: [
    BlockchainMixin,
    EncodingMixin,
    TargetMixin,
  ],
  components: {
    SimpleBlockchainTour,
    AddBlockButton,
    BlockCard,
    Link,
    Page,
    TldrCard,
  },
  data() {
    return {
      blockHash: 'f87efc353bf272c57c8b8dcfae6e98e1ea1349dc70b8be4292f10fc6ffacc162',
      data: 'The Times 03/Jan/2009 Chancellor on brink of second bailout for banks',
      prevHash: ''.padEnd(64, '0'),
    };
  },
  async mounted() {
    await this.blocks[0].calcHash(this.hexDigits);
    await this.addBlock();
    await this.addBlock();
  },
  methods: {
    async onExampleDataChange(event) {
      this.data = event.target.value;
      this.blockHash = await sha256dFromText(this.data + this.prevHash);
    },
    async onExamplePrevHashChange(event) {
      this.prevHash = event.target.value;
      this.blockHash = await sha256dFromText(this.data + this.prevHash);
    },
  },
};
</script>

<style>
.card-header.block_header .col {
  padding-left: 5px;
  padding-right: 5px;
}

#blockchain_section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/neurons_heating_up.webp');
}
</style>
