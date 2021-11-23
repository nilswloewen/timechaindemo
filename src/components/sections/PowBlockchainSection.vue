<template>
  <div id="pow_section" class="section">
    <Page data-anchor="pow" slide fp_bg>
      <EncodingButton :active-encoding="activeEncoding" :encoding="encoding"
                      v-on:update-active-encoding="updateActiveEncoding"
                      v-on:rotate-encoding="rotateEncoding" />
      <h1>
        Proof-of-Work Blockchain
      </h1>

      <b-card>
        <q>We propose a solution to the double-spending problem using a
          peer-to-peer network. The network timestamps transactions by hashing
          them into an ongoing chain of hash-based proof-of-work, forming a
          record that cannot be changed without redoing the proof-of-work.</q>
        - <a href="https://bitcoin.org/bitcoin.pdf">Bitcoin Whitepaper</a>
      </b-card>

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

      <b-card no-body>
        <b-card-header>
          Mining Algorithm
        </b-card-header>

        <b-card-body>
          <p>A. Prepare Block Header (data) </p>
          <p> 1. Pick a random Nonce (number used only once)</p>
          <p> 2. Calculate Hash: sha256d ( Block Header + Nonce ) </p>

          3. If Hash is less than Target then the block is considered valid and
          will be propagated to the network. The miner is awarded the mining
          reward + transaction fees
          (currently <em style="color: orange; font-weight: bolder">~6.25₿</em>)!
          <br/>
          &nbsp;&nbsp;&nbsp;If not - go back to step 1 try again!
        </b-card-body>
      </b-card>
    </Page>

    <Page data-anchor="target" slide fp_bg>
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
                   v-on:update-data="updateData" />
      </div>
    </Page>
    <div class="slide" data-anchor="pow_graph" id="pow_graph_slide">
      <div class="fp-bg"/>
      <Graph id="pow_canvas" :guesses="this.guesses" :target="this.target" :local-encoding="encoding[activeEncoding]"/>
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
};
</script>
