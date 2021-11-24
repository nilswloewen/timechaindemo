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

      <b-card>
        <h4 class="text-left">block (n.)</h4>
        <hr>
        <p>
          A block is a set of data with a hash that 'locks' the data in place.
        </p>

        <h6>Example</h6>
        <b-card no-body>
          <b-card-header>
            Block Hash or ID - The hash of the blocks' data
          </b-card-header>

          <!--Hash-->
          <b-list-group-item class="list-field">Number / Height</b-list-group-item>
          <b-list-group-item class="list-value">Also known as length</b-list-group-item>

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

      <div>
        In mining the hash is used in two ways:
        <ol>
          <li>To uniquely identify each block
            <br> - The successful hash of the block header becomes the block ID.
            This is embedded in the next block header as the previous block hash.
          </li>
          <li>As a random number generator
            <br> - A hash is neither random nor a number; a hash is simply a string of bits.
            However, in order to make bitcoin mining difficult, a block hash is interpreted
            as a number that must be less than an arbitrary target.
          </li>
        </ol>
      </div>
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
