<template>
<div id="blockchain_section" class="section">
  <Page slide data-anchor="blockchain">
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

    <b-card no-body>
      <b-card-body>
        <h4 class="text-left">block (n.)</h4>

        <hr>
        <p>
          A set of data with a hash that 'locks' the data in place. You cannot
          change the data without changing the hash.
        </p>
        <h6>Example</h6>
      </b-card-body>

      <b-card no-body>
        <b-card-header>
          Block Hash or ID - The hash of the blocks' data
        </b-card-header>

        <!--Hash-->
        <b-list-group-item class="list-field">Number / Height</b-list-group-item>
        <b-list-group-item class="list-value">Also known as length (of the chain)</b-list-group-item>

        <!--Data-->
        <b-list-group-item class="list-field">Data</b-list-group-item>
        <b-list-group-item class="list-value">Any arbitrary data</b-list-group-item>

        <!--Time-->
        <b-list-group-item class="list-field">Timestamp</b-list-group-item>
        <b-list-group-item class="list-value">
          The time the block was added to the blockchain
        </b-list-group-item>

        <!--Previous Hash-->
        <b-list-group-item class="list-field">Previous Hash</b-list-group-item>
        <b-list-group-item class="list-value">The hash of the previous block</b-list-group-item>
      </b-card>
    </b-card>

    <h2>Why does Bitcoin use a blockchain?</h2>

    <p>
      A physical coin or asset requires no history, it exists in only location at a time.
      Ownership is proven simply by who controls the coin.
    </p>

    <p>
      Bitcoin is not a physical asset, it is pure information. A ledger is used to keep track of
      who controls how much bitcoin.
    </p>

    If Alice starts with 0₿, how much does Bob hold after this sequence?
    <ol>
      <li>Alice earned 50₿ for mining the first block.</li>
      <li>Alice sent Bob 20₿</li>
    </ol>

    <ol>
      <li>Alice sent Bob 20₿ - ERROR! Alice does not have ₿ to send!</li>
      <li>Alice earned 50₿ for mining the first block.</li>
    </ol>

    <p>
      Bitcoin requires a blockchain to establish an order of events in the ledger to prove that one
      transaction came before another.
    </p>

  </Page>

  <Page data-anchor="simple_blockchain" slide
        encoding-btn
        :active-encoding="activeEncoding"

        v-on:rotate-encoding="rotateEncoding"
        v-on:update-active-encoding="updateActiveEncoding">
    <h1>Example: Simplified Blockchain</h1>
    <p>
      For this demo we will start by only looking at the first 2 digits of the hash of each block.
      This is a non-proof-of-work version of a blockchain. Add a few blocks and
      then watch as you change an old block the change is propagated up the chain.
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
  },
  data() {
    return {
      encoding: ['binary', 'decimal', 'hexadecimal']
    };
  }
};
</script>
