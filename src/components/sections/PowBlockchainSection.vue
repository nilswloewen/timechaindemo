<template>
<div id="pow_section" class="section">
  <MiningPOWSlide/>

  <Page data-anchor="target" slide>
    <h1> Target </h1>

    <p>
      Because we are starting this demo by only looking at the first 2 digits of the hash of
      each block, the possible hash values are between 00 and ff. Remember, a hash is just a number
      written in hexadecimal notation. In decimal notation the hash ff is 255. This means there are 256
      possible values between 00 and ff (0 to 255).
    </p>
    <p>For this section the target and block hashes will be in decimal notation instead of hexadecimal.</p>

    <p>
      The target is a movable value somewhere between the minimum and maximum that will be the
      cutoff for an acceptable hash. As the target goes down it becomes more difficult to find a winning hash.
    </p>

    <p>
      For now we will set the target to <b>15</b>, which means on average we will need to guess <b>17</b> times
      before finding a valid hash.
    </p>

    <Target
      :avgHashes="avgHashes"
      :denominator="denominator"
      :hash-max="hashMax"
      :localEncoding="encoding[activeEncoding]"
      :numerator="numerator"
      :probability="probability"
      :target="target"
      :targetMax="targetMax"
      hide-range
      v-on:updateTarget="updateTarget"/>
  </Page>

  <Page data-anchor="pow_blockchain" slide>
    <h1>Proof-of-work Blockchain</h1>

    <div class="blockchain_wrapper">
      <p v-if="blocks.length === 1" class="text-justify">
        If a block hash is outlined in red, that means the block is invalid because the hash is not
        less than the target.
        <b>Click on an invalid hash in order to mine the block.</b>
      </p>

      <BlockchainStatsCard :avg-guesses="avgGuesses" :est-avg-guesses="avgHashes"/>

      <AddBlockButton :disable-add-block-btn="disableAddBlockBtn"
                      :encoding="encoding[activeEncoding]"
                      v-on:add-block="addBlock"
                      v-on:reset-blocks="resetBlocks"/>

      <div id="blockchainPow" class="mt-4">
        <BlockCard
          v-for="(block, index) in this.blocks" :key="index"
          :block="block"
          :index="index"
          :local-encoding="encoding[activeEncoding]"
          showData
          showNonce
          v-on:rotate-encoding="rotateEncoding"
          v-on:mine-this-block="mineThisBlock"
          v-on:update-data="updateData"/>
      </div>
    </div>
  </Page>

  <div id="pow_mining_slide" class="slide" data-anchor="pow_mining">
    <div class="fp-bg"/>

    <Graph id="pow_canvas" :guesses="this.guesses" :local-encoding="encoding[activeEncoding]"
           :target="this.target" animate/>

    <div class="overlay">
      <b-container>
        <b-row>
          <b-col>
            <MiningControls
              :block="blocks[blockToMine]"
              :encoding-btn="false"
              :hash-max="hashMax"
              :index="blockToMine"
              :is-mining="isMining"
              :local-encoding="encoding[activeEncoding]"
              :target="target"
              collapse="pow_mining_controls"
              interactive-nonce
              v-on:update-nonce="updateNonce"/>

            <SuccessMsg
              :avg-hashes="avgHashes"
              :block-height="blocks[blockToMine].height"
              :is-hash-valid="blocks[blockToMine].isHashValid"
              :num-of-tries="guesses.length"/>

            <div class="nav_btn_mining_wrapper">
              <b-button class="nav_btn previous" size="sm" @click="previousSlide">
                <b-icon-arrow-left/>
                Prev
              </b-button>

              <b-button class="nav_btn next_slide mining" size="sm" @click="nextSlide">
                Next
                <b-icon-arrow-right/>
              </b-button>
            </div>

          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>

  <Page data-anchor="adjustable_target" last next-section-btn slide>
    <h1>Proof-of-work Review</h1>

    <p>Take a minute to play with these new concepts before moving forward.</p>
    <p>You can use the notation button to view the target and hash in hexadecimal format.</p>

    <p>
      Try changing the target to see how the mining difficulty changes.
      Then go back to the previous slides to try out the new target yourself.
    </p>

    <Target
      :avgHashes="avgHashes"
      :denominator="denominator"
      :hash-max="hashMax"
      :localEncoding="encoding[activeEncoding]"
      :numerator="numerator"
      :probability="probability"
      :target="target"
      :targetMax="targetMax"
      enable-change-encoding
      v-on:updateTarget="updateTarget"
      v-on:rotate-encoding="rotateEncoding"/>
  </Page>
</div>
</template>

<script>
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockchainStatsCard from '@/components/cards/BlockchainStatsCard';
import TldrCard from '@/components/cards/TldrCard';
import AddBlockButton from '@/components/controls/AddBlockButton.vue';
import MiningControls from '@/components/controls/MiningControls.vue';
import SuccessMsg from '@/components/controls/SuccessMsg';
import Target from '@/components/controls/Target.vue';
import Graph from '@/components/Graph';
import Link from '@/components/Link';
import Page from '@/components/Page.vue';
import MiningPOWSlide from '@/components/sections/slides/MiningPOWSlide';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import EncodingMixin from '@/mixins/EncodingMixin';
import TargetMixin from '@/mixins/TargetMixin';

export default {
  mixins: [
    BlockchainMixin,
    EncodingMixin,
    TargetMixin,
  ],
  components: {
    AddBlockButton,
    BlockCard,
    BlockchainStatsCard,
    Graph,
    Link,
    MiningControls,
    MiningPOWSlide,
    Page,
    SuccessMsg,
    Target,
    TldrCard,
  },
  data() {
    return {
      activeEncoding: 1,
      blockToMine: 0,
      guesses: [],
      isMining: false,
    };
  },

};
</script>

<style>
.overlay {
  position: fixed;
  top: 0;
  width: 100%;
  padding-top: 10vh;
}

#pow_mining_slide .mining_controls {
  max-width: 375px;
}

</style>
