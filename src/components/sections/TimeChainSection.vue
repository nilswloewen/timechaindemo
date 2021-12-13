<template>
<div id="timechain_section" class="section">
  <Page first slide prev-section-btn data-anchor="timechain">
    <h1>Timechain</h1>

    <b-card class="quote_card">
      <q>The only way to find a valid proof-of-work is by making a lot of guesses,
        and making a single guess takes a little bit of time. The probabilistic
        sum of these guesses is what builds up the timechain that is Bitcoin.</q>
      - <Link href="https://dergigi.com/2021/01/14/bitcoin-is-time/">DerGigi</Link>
    </b-card>

    <p>
      We've shown that by adjusting the target it becomes more or less difficult to
      find a valid hash. When more guesses are required, more <b>time</b> is required.
      The difficulty can be expressed as the number of guesses per unit of time required
      to find a valid hash.
    </p>

    <b-card class="definition_card">
      <h4>hashrate (n.)</h4>
      <hr>
      (computing, cryptocurrency) The number of hashes that a mining computer can calculate in a given
      period of time, usually a second.
      <hr>
      Hashes per second (H/s)
    </b-card>

    <p>
      Remember, if a miner finds a block they are rewarded with bitcoin, so the incentive is
      to mine as many blocks as possible to increase their profits. Not only are their computers
      running 24/7, to increase their chance of success miners find ways to increase their hashrate.
    </p>

    <p>
      This leads to a global arms race as Bitcoin mining is a competition that is open to anyone, anywhere.
      As each miner upgrades their hardware to increase their hashrate, every other miner must do the same
      or else the probability of their success decreases.
    </p>

    <p>
      To ensure that the timechain only grows at steady rate regardless of computing power, we can adjust
      the target in relation to hashrate.
    </p>

    <b-card class="definition_card">
      <h4>Timechain (n.)</h4>
      <hr>
      A blockchain that grows at a regulated time interval, regardless of hashrate.
    </b-card>

    <b-card class="quote_card">
      <q>To compensate for increasing hardware speed and varying interest in running nodes over time,
        the proof-of-work difficulty is determined by a moving average targeting an average number of
        blocks per hour. If they're generated too fast, the difficulty increases.</q>
      <br> - <Link href="https://bitcoin.org/bitcoin.pdf">Satoshi Nakamoto</Link>
      <hr>
      <q>In other words, the difficulty-adjustment is about keeping a constant
        time, not a constant level of security, difficulty, or energy expenditure.</q>
      <br> - <Link href="https://dergigi.com/2021/01/14/bitcoin-is-time/">DerGigi</Link>
    </b-card>

  </Page>

  <Page slide data-anchor="timechain_target">
    <h1>Difficulty Adjustment</h1>

    <p>
      By manipulating the target, we can regulate the average time it takes to mine
      a block. For this demo, let's try set the blocktime to 15 seconds.
    </p>

    <Difficulty
      :hashrate-long="getHashrateLong()"
      :hashrate="hashrate"
      :hashrateUnit="hashrateUnit"
      :hashrateUnits="hashrateUnits"
      :is-calibrating="isCalibrating"
      v-on:update-hashrate="updateHashrate"
      v-on:update-hashrate-unit="updateHashrateUnit"
      :blocktime="blocktime"
      :blocktime-unit="blocktimeUnit"
      :blocktime-units="blocktimeUnits"
      v-on:update-blocktime="updateBlocktime"
      v-on:update-blocktime-unit="updateBlocktimeUnit"
      v-on:calibrate-hps="calibrateHps"
      v-on:show-global-hashrate="onGlobal"/>

    <Target v-on:updateTarget="updateTargetAndBlocktime"
            v-on:rotate-encoding="rotateEncoding"
            hide-range
            :avgHashes="avgHashes"
            :denominator="denominator"
            :hash-max="hashMax"
            :localEncoding="encoding[activeEncoding]"
            :numerator="numerator"
            :probability="probability"
            :target="target"
            :targetMax="targetMax"/>
  </Page>

  <Page data-anchor="timechain_blocks" slide>
    <AddBlockButton :disable-add-block-btn="disableAddBlockBtn"
                    enable-change-encoding
                    :encoding="encoding[activeEncoding]"
                    v-on:rotate-encoding="rotateEncoding"
                    v-on:add-block="addBlock"
                    v-on:reset-blocks="resetBlocks"/>

    <div class="blockchain_wrapper">
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

  <div class="slide" data-anchor="timechain_mining" id="timechain_mining_slide">
    <div class="fp-bg"/>

    <Graph id="timechain_canvas" animate
           :guesses="this.guesses" :target="this.target" :local-encoding="encoding[activeEncoding]"/>
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
              show-go-brrr
              v-on:rotate-encoding="rotateEncoding"
              v-on:start-mining="startMining"
              v-on:stop-mining="stopMining"
              v-on:update-nonce="updateNonce"/>

            <SuccessMsg :block-height="blocks[blockToMine].height"
                        :is-hash-valid="blocks[blockToMine].isHashValid"
                        :time-to-mine="blocks[blockToMine].timeToMine"
                        :avg-hashes="avgHashes"
                        :est-time="{ blocktime, blocktimeUnit }"
                        :num-of-tries="blocks[blockToMine].tries"/>



            <div class="nav_btn_mining_wrapper">
              <b-button size="sm" class="nav_btn previous" @click="previousSlide">
                <b-icon-arrow-left/> Prev
              </b-button>

              <b-button size="sm" class="nav_btn next_slide mining" @click="nextSlide">
                Next <b-icon-arrow-right/>
              </b-button>
            </div>

          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>

  <Page last slide next-section-btn data-anchor="timechain_global">

    <h1>Real Difficulty</h1>
    <p>
      The demo section is over. So how hard can it really be? Compare the hashrate of your device to the
      global hashrate of the entire Bitcoin network. Mining is a global competition to see who can
      find a winning block first. If you were to mine Bitcoin with your device this is the
      phenomenal computing power you'd be up against.
    </p>
    <p>
    </p>

    <Difficulty
      :blocktime-unit="blocktimeUnit"
      :blocktime-units="blocktimeUnits"
      :blocktime="blocktime"
      :hashrate-long="getHashrateLong()"
      :hashrate="hashrate"
      :hashrateUnit="hashrateUnit"
      :hashrateUnits="hashrateUnits"
      show-global
      v-on:calibrate-hps="calibrateHps"
      v-on:update-blocktime="updateBlocktime"
      v-on:update-blocktime-unit="updateBlocktimeUnit"
      v-on:update-hashrate="updateHashrate"
      v-on:update-hashrate-unit="updateHashrateUnit"
      v-on:show-global-hashrate="onGlobal"/>

    <Target :avgHashes="avgHashes"
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

    <h2>Difficulty Adjustment Period</h2>
    <p>
      The blocktime for Bitcoin is set for 10 minutes in order to give time for the global network to stay in sync.
    </p>
    <p>
      Every two weeks (2,016 blocks) the time to average time find each block is calculated and compared
      to the goal of 10 minutes. If the average time is less than 10 minutes, the
      target is lowered and it becomes more difficult to find a valid block hash. If the average time
      is more than 10 minutes the mining difficult decreases so that blocks may be found faster.
    </p>
    <p>
      <b>Try setting the block time to 10 minutes to see how the target changes in relation to hashrate.</b>
    </p>
  </Page>

</div>
</template>

<script>
import AddBlockButton from '@/components/controls/AddBlockButton.vue';
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import EncodingMixin from '@/mixins/EncodingMixin';
import Graph from '@/components/Graph.vue';
import MiningControls from '@/components/controls/MiningControls.vue';
import Page from '@/components/Page.vue';
import SuccessMsg from '@/components/controls/SuccessMsg';
import Target from '@/components/controls/Target.vue';
import TargetMixin from '@/mixins/TargetMixin';
import Difficulty from '@/components/controls/Difficulty';
import Num from '@/services/Num';
import BlockchainApi from '@/services/BlockchainApi';
import Link from '@/components/Link';

export default {
  mixins: [
    BlockchainMixin,
    EncodingMixin,
    TargetMixin
  ],
  components: {
    Link,
    AddBlockButton,
    BlockCard,
    Difficulty,
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
      isMining: false,
      isCalibrating: false,
      isAdjustingTarget: false,
      hashrate: 42,
      hashrateUnit: 'base',
      blocktime: 15,
      blocktimeUnit: 'Seconds',
      blocktimeUnits: ['Seconds', 'Minutes', 'Hours', 'Days', 'Weeks', 'Months', 'Years'],
      hashrateUnits: [
        '',
        'Kilo',
        'Mega',
        'Giga',
        'Tera',
        'Peta',
        'Exa',
        'Zeta',
        'Yotta'
      ],
      hashrateConversion: {
        base: { value: 1 },
        Kilo: { value: 1_000 },
        Mega: { value: 1_000_000 },
        Giga: { value: 1_000_000_000 },
        Tera: { value: 1_000_000_000_000 },
        Peta: { value: 1_000_000_000_000_000 },
        Exa: { value: 1_000_000_000_000_000_000 },
        Zeta: { value: 1_000_000_000_000_000_000_000 },
        Yotta: { value: 1_000_000_000_000_000_000_000_000 }
      }
    };
  },
  mounted() {
    this.calibrateHps();
    this.calcTarget();
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
      const desiredSeconds = this.timeToSeconds(this.blocktime, this.blocktimeUnit);
      const desiredAvgHashes = desiredSeconds * hashrate;

      const { hexDigits, target } = this.findTargetAndMax(desiredAvgHashes);

      this.updateHexDigits(hexDigits);
      this.target = new Num(BigInt(target), this.hexDigits);
      this.calcStats();
    },
    async calibrateHps() {
      this.isCalibrating = true;
      const start = new Date().getTime();
      let elapsed = 0;

      while (elapsed < 1000) {
        this.blocks[0].header.nonce += 1;
        await this.finalizeBlock(0);
        elapsed = new Date().getTime() - start;
      }

      const hashes = this.blocks[0].header.nonce / (elapsed / 1000);
      this.setHashrate(hashes.toFixed(0));
      this.calcTarget();

      // Reset block.
      this.resetBlocks();
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
      const gigaHashrate = await BlockchainApi.getHashRate();
      this.setHashrate(gigaHashrate * this.hashrateConversion.Giga.value);
      this.calcTarget();
    },
    setHashrate(hashrate) {
      for (const unit of ['Yotta', 'Zeta', 'Exa', 'Peta', 'Tera', 'Giga', 'Mega', 'Kilo', 'base']) {
        if (hashrate > this.hashrateConversion[unit].value) {
          this.hashrate = hashrate / this.hashrateConversion[unit].value;
          this.hashrateUnit = unit;
          return;
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
    }
  }
};
</script>

<style>
#timechain_mining_slide .mining_controls {
  max-width: 305px;
}
</style>
