<template>
  <div class="section">
    <Page data-anchor="proof-of-work" slide>
      <h1>
        Proof-of-Work Blockchain
      </h1>

      <p>
        <q>We propose a solution to the double-spending problem using a
          peer-to-peer network. The network timestamps transactions by hashing
          them into an ongoing chain of hash-based proof-of-work, forming a
          record that cannot be changed without redoing the proof-of-work.</q>
        - <a href="https://bitcoin.org/bitcoin.pdf">Bitcoin Whitepaper</a>
      </p>

      <p>
        The block hash is now required to meet a certain criteria: we will
        interpret the hash as a number and only consider it valid if it is
        less than the <b>Target</b>.
      </p>

      <p>
        Because a hash of the data and previous hash will not meet the new criteria
        we will add one new field to the block called a <b>Nonce</b>, which is
        shorthand for 'a number used only once'. If the output hash does not meet the
        target criteria, we can change the nonce and try again.
      </p>
      <p>
        <q>The only way to find a valid proof-of-work is by making a lot of guesses,
          and making a single guess takes a little bit of time. The probabilistic
          sum of these guesses is what builds up the timechain that is Bitcoin.</q>
        - <a href="https://dergigi.com/2021/01/14/bitcoin-is-time/">DerGigi</a>
      </p>
      <Algorithm/>
      <Difficulty :hps-of-this-device="hpsOfThisDevice" :avg-hashes="avgHashes()"
                  v-on:calibrate-hps="calibrateHps"/>
    </Page>
    <Page data-anchor="simpleTest" slide>
      <h1>SimpleTest</h1>
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

    <Page data-anchor="target" slide >
      <Target full :initial-target="initialTarget" :max="this.targetMax"
              v-on:updateTarget="updateTarget"/>
    </Page>

    <Page data-anchor="pow_blockchain" slide>
      <h1>Proof-of-work Blockchain</h1>

      <Target :initial-target="initialTarget" :max="this.targetMax"
              v-on:updateTarget="updateTarget"/>

      <AddBlockButton :disable-add-block-btn="disableAddBlockBtn"
                      v-on:add-block="addBlock"
                      v-on:reset-blocks="resetBlocks"/>

      <div id="blockchainPow" class="text-center mt-4">
        <BlockCard v-for="(block, index) in this.blocks" :key="index"
                   :block="block"
                   :hex-digits="hexDigits"
                   :index="index"
                   showData
                   showNonce
                   v-on:finalizeBlock="finalizeBlock"
                   v-on:updateData="updateData"
                   v-on:updateNonce="updateNonce"
                   v-on:solveNonce="solveNonce" />
      </div>
    </Page>

    <Page data-anchor="timechain" slide>
      <h1>Timechain</h1>
      <p>
        So far the demo has only shown the first two digits of the hash. Change
        the slider to see more digits of the hash and see how the difficulty grows...
      </p>
      <Complexity :initial-hex-digits="2" v-on:update-hex-digits="updateHexDigits"/>
    </Page>
  </div>
</template>

<script>
import AddBlockButton from '@/components/AddBlockButton.vue';
import Algorithm from '@/components/cards/Algorithm.vue';
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import Complexity from '@/components/controls/Complexity.vue';
import Difficulty from '@/components/controls/Difficulty.vue';
import HashesPerSecondMixin from '@/mixins/HashesPerSecondMixin';
import Page from '@/components/pages/Page.vue';
import SolveNonceMixin from '@/mixins/SolveNonceMixin';
import Target from '@/components/controls/Target.vue';
import UpdateDataMixin from '@/mixins/UpdateDataMixin';
import UpdateHexDigitsMixin from '@/mixins/UpdateHexDigitsMixin';
import UpdateNonceMixin from '@/mixins/UpdateNonceMixin';
import UpdateTargetMixin from '@/mixins/UpdateTargetMixin';

export default {
  mixins: [
    BlockchainMixin,
    HashesPerSecondMixin,
    SolveNonceMixin,
    UpdateDataMixin,
    UpdateHexDigitsMixin,
    UpdateNonceMixin,
    UpdateTargetMixin,
  ],
  components: {
    AddBlockButton,
    Algorithm,
    BlockCard,
    Complexity,
    Difficulty,
    Page,
    Target,
  },
  data() {
    return {
      colors: [
        '#61e294',
        '#7bcdba',
        '#9799ca',
        '#b47aea',
        '#bd93d8',
      ],
      disableAddBlockBtn: true,
      hexDigits: 2,
      initialTarget: 32,
      target: 32,
      targetMax: 256,
    };
  },

  watch: {
    hexDigits() {
      this.targetMax = 2 ** (this.hexDigits * 4);
    },
  },

  methods: {
    getColor() {
      const i = this.index % this.colors.length;
      return this.colors[i];
    },

  },
};
</script>

<style>
  #target_table th {
    text-align: center;
  }
  #target_table td {
    text-align: center;
    min-width: 5em;
  }
</style>
