<template>
<div id="timechain_section" class="section">
  <TimechainSlide/>

  <Page data-anchor="timechain_target" slide>
    <h1>Difficulty Adjustment</h1>

    <b-card class="quote_card">
      <q>To compensate for increasing hardware speed and varying interest in running nodes over time,
        the proof-of-work difficulty is determined by a moving average targeting an average number of
        blocks per hour. If they're generated too fast, the difficulty increases.</q>
      <br> -
      <Link href="https://bitcoin.org/bitcoin.pdf">Satoshi Nakamoto</Link>
      <hr>
      <q>In other words, the difficulty-adjustment is about keeping a constant
        time, not a constant level of security, difficulty, or energy expenditure.</q>
      <br> -
      <Link href="https://dergigi.com/2021/01/14/bitcoin-is-time/">Gigi</Link>
    </b-card>

    <p>
      By manipulating the target, we can regulate the average time it takes to mine
      a block. For this demo, let's try set the blocktime to 15 seconds.
    </p>

    <Difficulty
      :blocktime="blocktime"
      :blocktime-unit="blocktimeUnit"
      :blocktime-units="blocktimeUnits"
      :hashrate="hashrate"
      :hashrate-long="getHashrateLong()"
      :hashrateUnit="hashrateUnit"
      :hashrateUnits="hashrateUnits"
      :is-calibrating="isCalibrating"
      show-calibrate-btn
      v-on:update-hashrate="updateHashrate"
      v-on:update-hashrate-unit="updateHashrateUnit"
      v-on:update-blocktime="updateBlocktime"
      v-on:update-blocktime-unit="updateBlocktimeUnit"
      v-on:calibrate-hps="calibrateHps"
      v-on:show-global-hashrate="onGlobal"/>

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
      v-on:updateTarget="updateTargetAndBlocktime"
      v-on:rotate-encoding="rotateEncoding"/>
  </Page>

  <Page data-anchor="timechain_blocks" slide>
    <h1>Timechain</h1>

    <div v-if="!showBlockStats" class="d-flex text-justify mb-4">
      Based on your device's computing power, each block will take about 15 seconds to mine.
    </div>

    <div class="blockchain_wrapper">
      <BlockchainStatsCard v-if="showBlockStats"
                           :avg-guesses="avgGuesses" :avg-time="avgTime"
                           :est-avg-guesses="avgHashes" :est-avg-time="blocktime"/>

      <p v-if="blocks.length > 3">
        <b-checkbox v-model="showBlockStats" switch>Show block stats</b-checkbox>
      </p>

      <AddBlockButton
        :disable-add-block-btn="disableAddBlockBtn"
        :encoding="encoding[activeEncoding]"
        enable-change-encoding
        v-on:rotate-encoding="rotateEncoding"
        v-on:add-block="addBlock"
        v-on:reset-blocks="resetTimechainBlocks"/>

      <BlockCard
        v-for="(block, index) in this.blocks" :key="index"
        :block="block"
        :index="index"
        :local-encoding="encoding[activeEncoding]"
        :show-stats="showBlockStats"
        showData
        showNonce
        type="time"
        v-on:rotate-encoding="rotateEncoding"
        v-on:mine-this-block="mineThisBlock"
        v-on:update-data="updateData"/>
    </div>
  </Page>

  <div id="timechain_mining_slide" class="slide" data-anchor="timechain_mining">
    <Graph id="timechain_canvas" :guesses="this.guesses"
           :local-encoding="encoding[activeEncoding]" :target="this.target" animate/>
    <div class="overlay">
      <b-container>
        <b-row>
          <b-col>
            <MiningControls
              v-if="!blocks[blockToMine].isHashValid"
              :block="blocks[blockToMine]"
              :hash-max="hashMax"
              :index="blockToMine"
              :is-mining="isMining"
              :local-encoding="encoding[activeEncoding]"
              :target="target"
              collapse="timechain_mining_controls"
              encoding-btn
              show-go-brrr
              type="time"
              v-on:rotate-encoding="rotateEncoding"
              v-on:start-mining="startTimechainMining"
              v-on:stop-mining="stopMining"/>

            <SuccessMsg
              :avg-hashes="avgHashes"
              :block-height="blocks[blockToMine].height"
              :est-time="{ blocktime, blocktimeUnit }"
              :is-hash-valid="blocks[blockToMine].isHashValid"
              :num-of-tries="blocks[blockToMine].tries"
              :time-to-mine="blocks[blockToMine].timeToMine"/>

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

  <RealWorldMiningSlide :global-hr="globalHr.long" :your-device-hr="yourDeviceHr"/>

  <Page data-anchor="timechain_review" last next-section-btn slide>
    <h1>Timechain Review</h1>

    <p>
      As you have seen, there is a relationship between <b>Hashrate</b>, <b>Block Time</b>, and the <b>Target</b>. Go
      ahead and play around with these numbers to see how difficult this game of mining can become.
    </p>

    <h2>Difficulty Adjustment Period</h2>
    <p>
      In the real world, Bitcoin's block time is regulated to 10 minutes. Every two weeks the
      difficulty is re-adjusted based on the average time it took to mine the previous 2,016 blocks.
      The adjustment involves calculations very similar to what you see here.
    </p>

    <Difficulty
      :blocktime="blocktime"
      :blocktime-unit="blocktimeUnit"
      :blocktime-units="blocktimeUnits"
      :hashrate="hashrate"
      :hashrate-long="getHashrateLong()"
      :hashrateUnit="hashrateUnit"
      :hashrateUnits="hashrateUnits"
      show-global
      show-hashrate-picker
      v-on:calibrate-hps="calibrateHps"
      v-on:update-blocktime="updateBlocktime"
      v-on:update-blocktime-unit="updateBlocktimeUnit"
      v-on:update-hashrate="updateHashrate"
      v-on:update-hashrate-unit="updateHashrateUnit"
      v-on:show-global-hashrate="onGlobal"/>

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
      v-on:updateTarget="updateTargetAndBlocktime"
      v-on:rotate-encoding="rotateEncoding"/>

  </Page>
</div>
</template>

<script>
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockchainStatsCard from '@/components/cards/BlockchainStatsCard';
import InfoCard from '@/components/cards/InfoCard';
import AddBlockButton from '@/components/controls/AddBlockButton.vue';
import Difficulty from '@/components/controls/Difficulty';
import MiningControls from '@/components/controls/MiningControls.vue';
import SuccessMsg from '@/components/controls/SuccessMsg';
import Target from '@/components/controls/Target.vue';
import Graph from '@/components/Graph.vue';
import Link from '@/components/Link';
import Page from '@/components/Page.vue';
import RealWorldMiningSlide from '@/components/sections/slides/RealWorldHashrateSlide';
import TimechainSlide from '@/components/sections/slides/TimechainSlide';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import EncodingMixin from '@/mixins/EncodingMixin';
import TargetMixin from '@/mixins/TargetMixin';
import BlockchainApi from '@/services/BlockchainApi';
import Num from '@/services/Num';

export default {
  mixins: [
    BlockchainMixin,
    EncodingMixin,
    TargetMixin,
  ],
  components: {
    BlockchainStatsCard,
    AddBlockButton,
    BlockCard,
    Difficulty,
    Graph,
    InfoCard,
    Link,
    MiningControls,
    Page,
    RealWorldMiningSlide,
    SuccessMsg,
    Target,
    TimechainSlide,
  },
  data() {
    return {
      activeEncoding: 1,
      avgTime: 0,
      blockToMine: 0,
      blocktime: 15,
      blocktimeUnit: 'Seconds',
      blocktimeUnits: ['Seconds', 'Minutes', 'Hours', 'Days', 'Weeks', 'Months', 'Years'],
      globalHr: { long: '180,000,000,000,000,000,000', value: 180, unit: 'Exa' },
      hashrate: 1,
      hashrateConversion: {
        base: { value: 1 },
        Kilo: { value: 1_000 },
        Mega: { value: 1_000_000 },
        Giga: { value: 1_000_000_000 },
        Tera: { value: 1_000_000_000_000 },
        Peta: { value: 1_000_000_000_000_000 },
        Exa: { value: 1_000_000_000_000_000_000 },
        Zeta: { value: 1_000_000_000_000_000_000_000 },
        Yotta: { value: 1_000_000_000_000_000_000_000_000 },
      },
      hashrateUnit: 'base',
      hashrateUnits: [
        '',
        'Kilo',
        'Mega',
        'Giga',
        'Tera',
        'Peta',
        'Exa',
        'Zeta',
        'Yotta',
      ],
      isAdjustingTarget: false,
      isCalibrating: false,
      isMining: false,
      showBlockStats: false,
      yourDeviceHr: 0,
    };
  },
  mounted() {
    this.calcTarget();
    this.setGlobalHr();
  },
  methods: {
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
      const desiredSeconds = this.timeToSeconds(this.blocktime, this.blocktimeUnit);
      const desiredAvgHashes = desiredSeconds * hashrate;

      const { hexDigits, target } = this.findTargetAndMax(desiredAvgHashes);

      this.updateHexDigits(hexDigits);
      this.target = new Num(BigInt(target), this.hexDigits);
      this.calcStats();
    },
    resetTimechainBlocks() {
      this.resetBlocks();
      this.setAvgTime();
    },
    async calibrateHps() {
      this.isCalibrating = true;
      const start = new Date().getTime();
      let elapsed = 0;

      while (elapsed < 2000) {
        this.blocks[0].header.nonce += 1;
        await this.finalizeBlock(0);
        elapsed = new Date().getTime() - start;
      }

      const hashes = this.blocks[0].header.nonce / (elapsed / 1000);
      const formattedHashes = this.formatHashrate(hashes.toFixed());
      this.hashrate = formattedHashes.value;
      this.hashrateUnit = formattedHashes.unit;
      this.yourDeviceHr = this.hashrate * this.hashrateConversion[this.hashrateUnit].value;
      this.calcTarget();

      // Reset block.
      this.resetTimechainBlocks();
      this.guesses = [];
      this.isCalibrating = false;
    },
    updateHashrate(newHashrate) {
      this.hashrate = Number(newHashrate || 1);
      this.calcTarget();
    },
    updateHashrateUnit(newHashrateUnit) {
      this.hashrateUnit = newHashrateUnit || 'base';
      this.calcTarget();
    },
    updateBlocktime(newTime) {
      this.blocktime = Number(newTime);
      this.calcTarget();
    },
    updateBlocktimeUnit(newTimeUnit) {
      this.blocktimeUnit = newTimeUnit;
      this.calcTarget();
    },
    async onGlobal() {
      this.hashrate = this.globalHr.value;
      this.hashrateUnit = this.globalHr.unit;
      this.calcTarget();
    },
    async getGlobalHr() {
      const gigaHashrate = await BlockchainApi.getHashRate();
      return gigaHashrate * this.hashrateConversion.Giga.value;
    },
    formatHashrate(hashrate) {
      for (const unit of ['Yotta', 'Zeta', 'Exa', 'Peta', 'Tera', 'Giga', 'Mega', 'Kilo', 'base']) {
        if (hashrate > this.hashrateConversion[unit].value) {
          const value = hashrate / this.hashrateConversion[unit].value;
          return { value, unit };
        }
      }
    },

    findTargetAndMax(desiredAvgHashes) {
      let hexDigits = 1;

      // Increase complexity by increasing maximum.
      while (hexDigits <= 64) {
        hexDigits += 1;
        let max = (16 ** hexDigits) - 1;
        let target = max;
        let avgHashes = 1 / (target / max);

        // Binary search down for closest match.
        while (target > 1) {
          target = Math.floor(target / 2);
          avgHashes = 1 / (target / max);

          if (desiredAvgHashes < avgHashes) {
            // Increment up to the closest match.
            while (target < max) {
              target += 1;
              avgHashes = 1 / (target / max);

              if (avgHashes < desiredAvgHashes) {
                return { hexDigits, target: Math.floor(target) };
              }
            }
          }
        }
      }
      // @TODO: This should never happen!
      return { hexDigits: 2, target: 69 };
    },

    timeToSeconds(time, unit) {
      switch (unit) {
        case 'Seconds':
          return time;
        case 'Minutes':
          return time * 60;
        case 'Hours':
          return time * 60 * 60;
        case 'Days':
          return time * 60 * 60 * 24;
        case 'Weeks':
          return time * 60 * 60 * 24 * 7;
        case 'Months':
          return time * 60 * 60 * 24 * 30;
        case 'Years':
          return time * 60 * 60 * 24 * 365;
      }
    },
    secondsToTime(seconds) {
      const minute = 60;
      if (seconds < minute) {
        return { val: seconds, unit: 'Seconds' };
      }

      const hour = minute * 60;
      if (seconds < hour) {
        return { val: Math.floor(seconds / minute), unit: 'Minutes' };
      }

      const day = hour * 24;
      if (seconds < day) {
        return { val: Math.floor(seconds / hour), unit: 'Hours' };
      }

      const week = day * 7;
      if (seconds < week) {
        return { val: Math.floor(seconds / day), unit: 'Days' };
      }

      const month = day * 30;
      if (seconds < month) {
        return { val: Math.floor(seconds / week), unit: 'Weeks' };
      }

      const year = day * 365;
      if (seconds < year) {
        return { val: Math.floor(seconds / month), unit: 'Months' };
      }

      const years = Math.floor(seconds / year);
      if (years < 1_000_000_000) {
        return { val: years.toLocaleString('en-US'), unit: 'Years' };
      }
      return { val: years.toExponential(2), unit: 'Years' };
    },

    getHashrateLong() {
      const hashrate = this.hashrate * this.hashrateConversion[this.hashrateUnit].value;
      return hashrate.toLocaleString();
    },

    async updateTargetAndBlocktime(newTarget) {
      await this.updateTarget(newTarget);

      const hashrate = this.hashrate * this.hashrateConversion[this.hashrateUnit].value;
      const seconds = Math.ceil((1 / hashrate) * this.avgHashes);
      const { val, unit } = this.secondsToTime(seconds);

      this.blocktime = val;
      this.blocktimeUnit = unit;
    },

    async setGlobalHr() {
      const globalHr = await this.getGlobalHr();
      const formattedGlobalHr = this.formatHashrate(globalHr);

      this.globalHr = {
        long: globalHr.toLocaleString(),
        unit: formattedGlobalHr.unit,
        value: Math.floor(formattedGlobalHr.value),
      };
    },
    startTimechainMining(index) {
      this.startMining(index);
      this.setAvgTime();
    },
    setAvgTime() {
      let totalTime = 0;
      this.blocks.forEach((block) => {
        totalTime += Number(block.timeToMine);
      });
      this.avgTime = (totalTime / this.blocks.length).toFixed(2);
    },

  },
};
</script>

<style>
#timechain_mining_slide .mining_controls {
  max-width: 375px;
}

#timechain_section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/transcending_forward.webp');
}
</style>
