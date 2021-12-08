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
      minted bitcoin. The reward started at 50₿ per block and the amount gets halved every 4 years. This is why
      Bitcoin has a <a href="https://en.bitcoin.it/wiki/Controlled_supply">limited supply</a>.
    </p>
    <p>
      This demo should show you why Bitcoin's monetary policy is far more rational than the Federal Reserve,
      who simply say <a href="https://moneyprintergobrrr.com/" target="_blank">Money Printer Go BRRR!</a>
    </p>

    <hr>

    <TldrCard title="tl;dr | Mining Algorithm">
      <ol>
        <li> Pick a random number (<b>nonce</b>)</li>
        <li> Calculate <b>hash</b> of ( data & <b>nonce</b> )</li>
        <li> If <b>hash</b> is less than the <b>target</b>
          <ul>
            <li> The hash is valid and the block will be added to the blockchain!</li>
            <li> If not &mdash; go back to step 1 and try again!</li>
          </ul>
        </li>
      </ol>
    </TldrCard>
    <b-card no-body class="img_card">
      <img alt="That's just a dice game with extra steps!"
           class="card-img" src="/assets/backgrounds/rick_dice_game.jpg"/>
    </b-card>

    <hr>

    <p>
      In the previous example of a blockchain, every block hash was considered valid.
      To make mining difficult, Bitcoin requires that a block hash will only be valid if
      it is interpreted as a number that is less than a pre-determined <b>target</b>.
    </p>
    <p>
      Because the hash of each block will probably not meet the new criteria,
      we will add one new field to the block called a <b>nonce</b>.
    </p>

    <b-card class="definition_card">
      <h4>nonce (n.)</h4>
      <hr>
      In phrase 'for the nonce' (Middle English for þe naness, c. 1200)
      "for a special occasion, for a particular purpose"
      <hr>
      In cryptography it is said to be shorthand for <br>'A number used once'
      <hr>
      A random number used to prove work was done to find valid hash
    </b-card>

    <p>
      If the hash of the block is invalid, the hash will be rejected and we will
      try again with a new nonce. It may take many, many tries to find a valid
      hash, which is why this system is called <b>Proof-of-Work</b>.
    </p>

    <b-card class="quote_card">
      <q>The network timestamps transactions by hashing
        them into an ongoing chain of hash-based proof-of-work, forming a
        record that cannot be changed without redoing the proof-of-work.</q>
      <br> - <a href="https://bitcoin.org/bitcoin.pdf">Satoshi Nakamoto</a>
    </b-card>
  </Page>

  <div class="slide" data-anchor="target" id="target_slide">
    <div class="fp-bg"/>

    <Graph id="pow_target_canvas" :guesses="[]"
           :target="this.target" :local-encoding="encoding[activeEncoding]"/>

    <div class="overlay">
      <b-container>
        <b-row>
          <b-col>

            <h1> Target </h1>

            <p>
              For this demo we will start by only looking at the first 2 digits of the hash of each block.
            </p>
            <p style="font-size: 0.875rem; text-align: center;">
              <b>XX</b>{{ ''.padEnd(62, 'x') }}
            </p>

            <hr>

            <p>
              Because we are starting this demo by only looking at the first 2 digits of the hash of
              each block, the maximum value of a hash (ff) is 255 and the minimum value is 0.
            </p>

            <p>
              The target is a movable value somewhere between the min and max that will be the
              cutoff for an acceptable hash. <b>Try moving the target to see how the probabilities change.</b>
            </p>
            <p>
              As the target goes down it becomes more difficult to find a winning hash.
            </p>

            <Target v-on:updateTarget="updateTarget"
                    v-on:rotate-encoding="rotateEncoding"
                    :avgHashes="avgHashes"
                    :denominator="denominator"
                    :hash-max="hashMax"
                    :localEncoding="encoding[activeEncoding]"
                    :numerator="numerator"
                    :probability="probability"
                    :target="target"
                    :targetMax="targetMax"/>

          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>

  <Page data-anchor="pow_blockchain" slide>
    <h1>Proof-of-work Blockchain</h1>

    <AddBlockButton :disable-add-block-btn="disableAddBlockBtn"
                    :encoding="encoding[activeEncoding]"
                    v-on:rotate-encoding="rotateEncoding"
                    v-on:add-block="addBlock"
                    v-on:reset-blocks="resetBlocks"/>

    <div id="blockchainPow" class="blockchain_wrapper mt-4">
      <BlockCard v-for="(block, index) in this.blocks" :key="index"
                 :block="block"
                 :index="index"
                 :local-encoding="encoding[activeEncoding]"
                 showData
                 showNonce
                 v-on:rotate-encoding="rotateEncoding"
                 v-on:mine-this-block="mineThisBlock"
                 v-on:update-data="updateData"/>
    </div>
  </Page>

  <div class="slide" data-anchor="pow_mining" id="pow_mining_slide">
    <div class="fp-bg"/>

    <Graph id="pow_canvas" :guesses="this.guesses" animate
           :target="this.target" :local-encoding="encoding[activeEncoding]"/>

    <div class="overlay">
      <b-container>
        <b-row>
          <b-col>
            <MiningControls
              :block="blocks[blockToMine]"
              :hash-max="hashMax"
              :index="blockToMine"
              :is-mining="isMining"
              :local-encoding="encoding[activeEncoding]"
              :target="target"
              interactive-nonce
              v-on:rotate-encoding="rotateEncoding"
              v-on:start-mining="startMining"
              v-on:update-nonce="updateNonce"/>

            <SuccessMsg :block-height="blocks[blockToMine].height"
                        :is-hash-valid="blocks[blockToMine].isHashValid"
                        :avg-hashes="avgHashes"
                        :num-of-tries="guesses.length"/>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</div>
</template>

<script>
import AddBlockButton from '@/components/controls/AddBlockButton.vue';
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import EncodingMixin from '@/mixins/EncodingMixin';
import Graph from '@/components/Graph';
import MiningControls from '@/components/controls/MiningControls.vue';
import Page from '@/components/Page.vue';
import SuccessMsg from '@/components/controls/SuccessMsg';
import Target from '@/components/controls/Target.vue';
import TargetMixin from '@/mixins/TargetMixin';
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
    Graph,
    MiningControls,
    Page,
    Target,
    SuccessMsg
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

.overlay {
  position: fixed;
  top: 0;
  width: 100%;
  padding-top: 10vh;
}

#pow_mining_slide .mining_controls {
  max-width: 290px;
}

</style>
