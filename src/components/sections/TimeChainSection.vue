<template>
<div id="timechain_section" class="section">
  <Page data-anchor="timechain" slide>
    <h1>Timechain</h1>


    <b-card>
      <q>The only way to find a valid proof-of-work is by making a lot of guesses,
        and making a single guess takes a little bit of time. The probabilistic
        sum of these guesses is what builds up the timechain that is Bitcoin.</q>
      - <a href="https://dergigi.com/2021/01/14/bitcoin-is-time/" target="_blank">DerGigi</a>
    </b-card>

    <p>
      We've shown that by adjusting the target it becomes more difficult to
      find a valid hash. More tries requires more <b>time</b>.
    </p>

    <p>
      Remember, if a miner finds a valid hash they are rewarded with bitcoin, so the incentive is
      to mine as many blocks as possible to increase their profits. Not only are their miners running 24/7,
      to increase their chance of success they find ways to increase their computing power.
    </p>

    <p>
      This leads to a global arms race as Bitcoin mining is a competition that is open to anyone, anywhere.
      As each miner upgrades their hardware to increase their mining capacity, every other miner must do the same to
      keep up or else the probability of their success decreases.
    </p>

    <p>
      To ensure
      Every 2,016 blocks (two weeks) Bitcoin network self-adjusts the target to ensure that blocks
      are always added to the chain at 10 minute intervals.
    </p>

    <b-card>
      <h4>Timechain</h4>
      <hr>
      A blockchain that grows at a fixed interval, regardless of computing power.
    </b-card>
  </Page>

  <Page data-anchor="difficulty_adjustment" slide encoding-btn
        :active-encoding="activeEncoding"
        :encoding="encoding"
        v-on:rotate-encoding="rotateEncoding"
        v-on:update-active-encoding="updateActiveEncoding">

    <h1>Difficulty Adjustment</h1>

    <p>
      Mining capacity is rated by the <b>hashrate</b> or how many hashes per second (H/s) that a miner can find.
    </p>
    <p>
      This is the Crème de la crème, cherry-on-top engineering marvel of Bitcoin.
    </p>

    <b-card>
      <q>To compensate for increasing hardware speed and varying interest in running nodes over time,
        the proof-of-work difficulty is determined by a moving average targeting an average number of
        blocks per hour. If they're generated too fast, the difficulty increases.</q>
      <br> - <a href="https://bitcoin.org/bitcoin.pdf" target="_blank">Satoshi Nakamoto</a>
      <hr>
      <q>In other words, the difficulty-adjustment is about keeping a constant
        time, not a constant level of security, difficulty, or energy expenditure.</q>
      <br> - <a href="https://dergigi.com/2021/01/14/bitcoin-is-time/" target="_blank">DerGigi</a>
    </b-card>

    <Difficulty
      :hashrate-long="getHashrateLong()"
      :hashrate-latin="getHashrateLatin()"
      :hashrate="hashrate"
      :hashrateUnit="hashrateUnit"
      :hashrateUnits="hashrateUnits"
      v-on:update-hashrate="updateHashrate"
      v-on:update-hashrate-unit="updateHashrateUnit"
      :blocktime="blocktime"
      :blocktime-unit="blocktimeUnit"
      :blocktime-units="blocktimeUnits"
      v-on:update-blocktime="updateBlocktime"
      v-on:update-blocktime-unit="updateBlocktimeUnit"
      v-on:calibrate-hps="calibrateHps"
      v-on:show-antminer-hashrate="onAntminer"
      v-on:show-global-hashrate="onGlobal"
    />

    <Target v-on:updateTarget="updateTargetAndBlocktime"
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

  <Page data-anchor="timechain_blocks" slide encoding-btn
        :active-encoding="activeEncoding"
        :encoding="encoding"
        v-on:rotate-encoding="rotateEncoding"
        v-on:update-active-encoding="updateActiveEncoding">

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
                 v-on:update-data="updateData"/>
    </div>
  </Page>

  <div class="slide" data-anchor="timechain_mining" id="timechain_mining_slide">
    <div class="fp-bg"/>
    <EncodingButton :active-encoding="activeEncoding" :encoding="encoding"
                    v-on:update-active-encoding="updateActiveEncoding"
                    v-on:rotate-encoding="rotateEncoding"/>

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
      v-on:update-nonce="updateNonce"/>

    <SuccessMsg :block-height="blocks[blockToMine].height" :is-hash-valid="blocks[blockToMine].isHashValid"/>
  </div>

</div>
</template>

<script>
import AddBlockButton from '@/components/controls/AddBlockButton.vue';
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import EncodingButton from '@/components/controls/EncodingButton.vue';
import EncodingMixin from '@/mixins/EncodingMixin';
import Graph from '@/components/Graph.vue';
import MiningControls from '@/components/controls/MiningControls.vue';
import Page from '@/components/Page.vue';
import SuccessMsg from '@/components/controls/SuccessMsg';
import Target from '@/components/controls/Target.vue';
import TargetMixin from '@/mixins/TargetMixin';
import Difficulty from '@/components/controls/Difficulty';
import DifficultyMixin from '@/mixins/DifficultyMixin';
import Num from '@/services/Num';

export default {
  mixins: [
    BlockchainMixin,
    DifficultyMixin,
    EncodingMixin,
    TargetMixin
  ],
  components: {
    AddBlockButton,
    BlockCard,
    Difficulty,
    EncodingButton,
    Graph,
    MiningControls,
    Page,
    SuccessMsg,
    Target
  },
  data() {
    return {
      blockToMine: 0,
      activeEncoding: 1,
      hexDigits: 2,
      isMining: false,
      isAdjustingTarget: false,
    };
  },
  mounted() {
    this.calibrateHps();
  },
  methods: {
    updateNonce(nonce) {
      this.blocks[this.blockToMine].header.nonce = Number(nonce);
      this.finalizeBlock(this.blockToMine);
    },
    updateHexDigits(newHexDigits) {
      this.hexDigits = newHexDigits;

      const max = BigInt(`0x${ ''.padEnd(this.hexDigits, 'f') }`);

      this.targetMax = new Num(max - 1n, this.hexDigits);
      this.hashMax = new Num(max, this.hexDigits);

      // Reset guesses so that they are not still painted on graph.
      this.guesses = [];
    },
    calcTarget() {
      const hashrate = this.hashrate * this.hashrateConversion[this.hashrateUnit].value;
      const desiredSeconds = this.timeToSeconds(this.blockTime, this.blockTimeUnit);
      const desiredAvgHashes = desiredSeconds * hashrate;

      const { hexDigits, target } = this.findTargetAndMax(desiredAvgHashes);

      this.updateHexDigits(hexDigits);
      this.target = new Num(BigInt(target), this.hexDigits);
      this.calcStats();
    },
  }
};
</script>

<style>
/* Hide slide arrows on first and last slide. */
.fp-viewing-timechain-timechain .fp-controlArrow.fp-prev,
.fp-viewing-pow-pow_mining .fp-controlArrow.fp-next {
  display: none;
}
</style>
