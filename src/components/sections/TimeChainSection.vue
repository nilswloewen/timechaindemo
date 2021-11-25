<template>
  <div id="timechain_section" class="section">
    <Page data-anchor="timechain" slide encoding-btn v-on:rotate-encoding="rotateEncoding" v-on:update-active-encoding="updateActiveEncoding">
      <h1>Timechain</h1>
      <p>
        <q>In other words, the difficulty-adjustment is about keeping a constant
          time, not a constant level of security, difficulty, or energy expenditure.</q>
        - DerGigi
      </p>

      <p>
        <q>The only way to find a valid proof-of-work is by making a lot of guesses,
          and making a single guess takes a little bit of time. The probabilistic
          sum of these guesses is what builds up the timechain that is Bitcoin.</q>
        - <a href="https://dergigi.com/2021/01/14/bitcoin-is-time/">DerGigi</a>
      </p>

      <Difficulty :hps-of-this-device="hpsOfThisDevice" :avg-hashes="calcAvgHashes()"
                  :difficulty="difficulty"
                  :hash-max="hashMax"
                  :local-encoding="encoding[activeEncoding]"
                  v-on:calibrate-hps="calibrateHps"
                  v-on:update-hex-digits="updateHexDigits"/>

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

    <Page data-anchor="timechain_blocks" slide encoding-btn v-on:rotate-encoding="rotateEncoding" v-on:update-active-encoding="updateActiveEncoding">
      <AddBlockButton :disable-add-block-btn="disableAddBlockBtn"
                      v-on:add-block="addBlock"
                      v-on:reset-blocks="resetBlocks"/>
      <div class="blockchain_wrapper">
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

    <div class="slide" data-anchor="timechain_graph" id="timechain_graph_slide">
      <div class="fp-bg"/>
      <EncodingButton :active-encoding="activeEncoding" :encoding="encoding"
                      v-on:update-active-encoding="updateActiveEncoding"
                      v-on:rotate-encoding="rotateEncoding" />

      <Graph id="timechain_canvas" animate
             :guesses="this.guesses" :target="this.target" :local-encoding="encoding[activeEncoding]"/>

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
import Difficulty from '@/components/controls/Difficulty.vue';
import EncodingButton from '@/components/controls/EncodingButton.vue';
import Graph from '@/components/Graph.vue';
import MiningControls from '@/components/controls/MiningControls.vue';
import Page from '@/components/Page.vue';
import Target from '@/components/controls/Target.vue';
import TargetMixin from '@/mixins/TargetMixin';

export default {
  mixins: [
    BlockchainMixin,
    TargetMixin,
  ],
  components: {
    AddBlockButton,
    BlockCard,
    Difficulty,
    EncodingButton,
    Graph,
    MiningControls,
    Page,
    Target,
  },
  data() {
    return {
      blockToMine: 0,
      isMining: false,
    };
  },

  methods: {
    onNonceChange(nonce) {
      this.blocks[this.blockToMine].header.nonce = Number(nonce);
      this.finalizeBlock(this.blockToMine)
    },
  },
};
</script>
