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
  </div>
</template>

<script>
import AddBlockButton from '@/components/controls/AddBlockButton.vue';
import Algorithm from '@/components/cards/Algorithm.vue';
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import NonceMixin from '@/mixins/NonceMixin';
import Page from '@/components/pages/Page.vue';
import Target from '@/components/controls/Target.vue';
import UpdateDataMixin from '@/mixins/UpdateDataMixin';
import UpdateHexDigitsMixin from '@/mixins/UpdateHexDigitsMixin';
import UpdateTargetMixin from '@/mixins/TargetMixin';

export default {
  mixins: [
    BlockchainMixin,
    NonceMixin,
    UpdateDataMixin,
    UpdateHexDigitsMixin,
    UpdateTargetMixin,
  ],
  components: {
    AddBlockButton,
    Algorithm,
    BlockCard,
    Page,
    Target,
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
