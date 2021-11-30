<template>
<div id="pow_section" class="section">
  <Page data-anchor="pow" slide>
    <h1> Mining / Proof-of-Work </h1>

    <p>
      Mining is the process of adding new blocks to the blockchain. The name comes from the idea that
      if you search hard enough, you will be rewarded with 'digital gold' aka Bitcoin.
    </p>
    <p>
      Every time a miner successfully adds a block to the blockchain they are given a reward of newly
      minted bitcoin. The reward amount diminishes over time which is why Bitcoin has a
      <a href="https://en.bitcoin.it/wiki/Controlled_supply">limited supply</a>.
    </p>

    <hr>

    <p>
      In the previous example of a blockchain, every block hash was considered valid.
      To make mining difficult, Bitcoin requires that a block hash will only be valid if
      it is interpreted as a number that is less than a pre-determined <b>target</b>.
    </p>

    <p>
      Because a hash of our demo block will likely not will not meet the new criteria,
      we will add one new field to the block called a <b>nonce</b>.
    </p>

    <b-card>
      <h4 class="text-left">nonce (n.)</h4>
      <hr>
      In phrase 'for the nonce' (Middle English for þe naness, c. 1200)
      "for a special occasion, for a particular purpose"
      <hr>
      In cryptography it is said to be shorthand for <br>'A number used only once'
    </b-card>

    <p>
      If the hash of the
      (data & previous hash & nonce) is invalid, the hash will be discarded and we will
      try again with a new nonce. Because this will take many, many tries to find a valid
      hash, this system is called <b>Proof-of-Work</b>.
    </p>

    <b-card no-body>
      <b-card-header header-bg-variant="info">
        Mining Algorithm
      </b-card-header>
      <b-card-body>
        <ol>
          <li> Pick a random <b>nonce</b></li>
          <li> Calculate <b>hash</b>: sha256d ( data + <b>nonce</b> )</li>
          <li> If <b>hash</b> is less than <b>target:</b>
            <ul>
              <li>
                The hash is considered valid and the block will be added to the blockchain!
              </li>
              <li> If not - go back to step 1 try again!</li>
            </ul>
          </li>
        </ol>
      </b-card-body>
    </b-card>

    <b-card>
      <q>
        The network timestamps transactions by hashing
        them into an ongoing chain of hash-based proof-of-work, forming a
        record that cannot be changed without redoing the proof-of-work.</q>
      <br> - <a href="https://bitcoin.org/bitcoin.pdf">Satoshi Nakamoto</a>
    </b-card>

  </Page>

  <Page data-anchor="target" slide
        encoding-btn
        :active-encoding="activeEncoding"
        :encoding="encoding"
        v-on:rotate-encoding="rotateEncoding"
        v-on:update-active-encoding="updateActiveEncoding">

    <h1> Target </h1>
    <p>
      Because we are starting this demo by only looking at the first 2 digits of the hash of
      each block, the maximum value of a hash is 255 and the minimum value is 0.
    </p>

    <p>
      The target is a movable value somewhere between the min and max that will be the
      cutoff for an acceptable hash. <b>Try moving the target to see how the probabilities change.</b>
    </p>
    <p>
      As the target goes down it becomes more difficult to find a winning hash.
    </p>

    <Target v-on:updateTarget="updateTarget"
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

  <Page data-anchor="pow_blockchain" slide
        encoding-btn
        :active-encoding="activeEncoding"
        :encoding="encoding"
        v-on:rotate-encoding="rotateEncoding"
        v-on:update-active-encoding="updateActiveEncoding">

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
                 v-on:update-data="updateData"/>
    </div>
  </Page>

  <div class="slide" data-anchor="pow_mining" id="pow_mining_slide">
    <div class="fp-bg"/>
    <EncodingButton :active-encoding="activeEncoding"
                    :encoding="encoding"
                    v-on:update-active-encoding="updateActiveEncoding"
                    v-on:rotate-encoding="rotateEncoding"/>

    <Graph id="pow_canvas" :guesses="this.guesses" :target="this.target" :local-encoding="encoding[activeEncoding]"/>
    <MiningControls
      :block="blocks[blockToMine]"
      :hash-max="hashMax"
      :index="blockToMine"
      :is-mining="isMining"
      :local-encoding="encoding[activeEncoding]"
      :target="target"
      v-on:start-mining="startMining"
      v-on:update-nonce="updateNonce"/>
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
import Page from '@/components/Page.vue';
import Target from '@/components/controls/Target.vue';
import TargetMixin from '@/mixins/TargetMixin';

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
    Graph,
    MiningControls,
    Page,
    Target
  },
  data() {
    return {
      activeEncoding: 1,
      blockToMine: 0,
      guesses: [],
      isMining: false
    };
  }
};
</script>

<style>
/* Hide slide arrows on first and last slide. */
.fp-viewing-pow-pow .fp-controlArrow.fp-prev,
.fp-viewing-pow-pow_mining .fp-controlArrow.fp-next {
  display: none;
}
</style>
