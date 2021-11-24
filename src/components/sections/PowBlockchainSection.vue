<template>
  <div id="pow_section" class="section">
    <Page data-anchor="pow" slide fp_bg>
      <EncodingButton :active-encoding="activeEncoding" :encoding="encoding"
                      v-on:update-active-encoding="updateActiveEncoding"
                      v-on:rotate-encoding="rotateEncoding" />
      <h1> Mining </h1>

      <p>
        In a non-proof-of-work blockchain every block hash is considered valid.
        Bitcoin is designed with an arbitrary requirement that a hash must
        meet a certain criteria.
      </p>

      <b-card>
        <q>We propose a solution to the double-spending problem using a
          peer-to-peer network. The network timestamps transactions by hashing
          them into an ongoing chain of hash-based proof-of-work, forming a
          record that cannot be changed without redoing the proof-of-work.</q>
        <br> - <a href="https://bitcoin.org/bitcoin.pdf">Bitcoin Whitepaper</a>
      </b-card>

      <p>
        The block hash will now be required to meet a certain criteria: we will
        interpret the hash as a number and only consider it valid if it is
        less than the <b>Target</b>.
      </p>
    </Page>

    <Page data-anchor="target" slide fp_bg>
      <h1> Target </h1>
      <p>
        For this demo we will start by only looking at the first 2 digits of the sha256d hash of
        each block. This makes the maximum value of a hash 255 and the minimum value 0.
      </p>

      <p>
        The target is a movable value somewhere between the min and max that will be an arbitrary
        cutoff for an acceptable hash.
      </p>

      <Target v-on:updateTarget="updateTarget" full
              v-on:real-target-max="realTargetMax"
              :avgHashes="avgHashes"
              :denominator="denominator"
              :hash-max="hashMax"
              :localEncoding="encoding[activeEncoding]"
              :numerator="numerator"
              :probability="probability"
              :target="target"
              :targetMax="targetMax"/>
    </Page>

    <Page slide data-anchor="nonce" fp_bg>
      <h1> Nonce </h1>

      <b-card>
        <h4 class="text-left">nonce (n.)</h4>
        <hr>
        In phrase 'for the nonce' (Middle English for þe naness, c. 1200) "for a special occasion, for a particular purpose"
        <hr>
        In cryptography it is said to be shorthand for <br>'A number used only once'
      </b-card>

      <p>
        Because a hash of the data and previous hash will not meet the new criteria
        we will add one new field to the block called a <b>Nonce</b>. If the output
        hash does not meet the target criteria, we can change the nonce and try again.
      </p>
    </Page>

    <Page data-anchor="pow_blockchain" slide fp_bg>
      <h1>Proof-of-work Blockchain</h1>

      <AddBlockButton :disable-add-block-btn="disableAddBlockBtn"
                      v-on:add-block="addBlock"
                      v-on:reset-blocks="resetBlocks"/>

      <div id="blockchainPow" class="text-center mt-4">
        <BlockCard v-for="(block, index) in this.blocks" :key="index"
                   :block="block"
                   :hex-digits="hexDigits"
                   :index="index"
                   :local-encoding="encoding[activeEncoding]"
                   showData
                   showNonce
                   v-on:mine-this-block="mineThisBlock"
                   v-on:update-data="updateData" />
      </div>
    </Page>

    <Page data-anchor="mining_algorithm" slide fp_bg>
      <b-card no-body header="Mining Algorithm">
        <b-card-body>
          <p> A. Prepare Block Header (data) </p>
          <p> 1. Pick a random Nonce (number used only once)</p>
          <p> 2. Calculate Hash: sha256d ( Block Header + Nonce ) </p>

          3. If Hash is less than Target then the block is considered valid and
          will be added to the blockchain
          <br/>
          &nbsp;&nbsp;&nbsp;If not - go back to step 1 try again!
        </b-card-body>
      </b-card>
    </Page>

    <div class="slide" data-anchor="pow_graph" id="pow_graph_slide">
      <div class="fp-bg"/>
      <Graph id="pow_canvas" :guesses="getGuesses()" :target="this.target" :local-encoding="encoding[activeEncoding]"/>
      <MiningControls
        :block="blocks[blockToMine]"
        :hash-max="hashMax"
        :index="blockToMine"
        :is-mining="isMining"
        :local-encoding="encoding[activeEncoding]"
        :target="target"
        v-on:start-mining="startMining"
        v-on:update-nonce="updateNonce" />
    </div>
  </div>
</template>

<script>
import AddBlockButton from '@/components/controls/AddBlockButton.vue';
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import EncodingButton from '@/components/controls/EncodingButton.vue';
import EncodingMixin from '@/mixins/EncodingMixin';
import Graph from '@/components/Graph';
import MiningControls from '@/components/controls/MiningControls.vue';
import NonceMixin from '@/mixins/NonceMixin';
import Page from '@/components/Page.vue';
import Target from '@/components/controls/Target.vue';
import TargetMixin from '@/mixins/TargetMixin';
import UpdateDataMixin from '@/mixins/UpdateDataMixin';
import UpdateHexDigitsMixin from '@/mixins/UpdateHexDigitsMixin';

export default {
  mixins: [
    BlockchainMixin,
    EncodingMixin,
    NonceMixin,
    TargetMixin,
    UpdateDataMixin,
    UpdateHexDigitsMixin,
  ],
  components: {
    AddBlockButton,
    BlockCard,
    EncodingButton,
    Graph,
    MiningControls,
    Page,
    Target,
  },
  data() {
    return {
      guesses: [],
      blockToMine: 0,
      isMining: false,
    };
  },
  methods: {
    getGuesses() {
      // Only show one guess at a time.
      return this.guesses.length > 0
        ? [this.guesses[this.guesses.length - 1]]
        : [];
    }
  }
};
</script>
