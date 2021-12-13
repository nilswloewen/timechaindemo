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
              encoding-btn
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

  <Page slide data-anchor="real_world_mining">
    <h1> Real World Mining </h1>

    <h3>ASIC Miners</h3>
    <p>
      When Bitcoin was first discovered, miners were using home computers and laptops to mine. Over the years
      new methods have been found to optimize hashrate to increase miner's profits. Nowadays it's impractical
      to use a home computer for mining because specialized computers have been created that can only mine
      bitcoin and they do it well, these are called ASIC (Application-Specific Integrated Circuit) miners.
    </p>

    <p>
      The <Link href="https://shop.bitmain.com/promote/antminer_s9i_asic_bitcoin_miner/overview">Antminer S9i</Link> is one of the most popular ASICs on the market.

      The hashrate of just one of these units is ~13 TeraHashes per second, or 13,000,000,000,000 <sub>TH/s</sub>.
    </p>

    <InfoCard title="Antminer S9i">
      <img class="card-img" src="/assets/antminerS9.jpeg" alt="Antminer S9"/>
    </InfoCard>

    <hr>
    <h3>Mining Farms</h3>

    <p>
      You may have seen photos of massive warehouses of electronics and blinking lights
    </p>

    <InfoCard title="Mining Farm">
      <img class="card-img" src="/assets/mining_farm.jpeg" alt="Mining Farm"/>
    </InfoCard>

    <p>
      Compare the hashrate of your device to the
      global hashrate of the entire Bitcoin network. Mining is a global competition to see who can
      find a winning block first. If you were to mine Bitcoin with your device this is the
      phenomenal computing power you'd be up against.
    </p>

    <hr>

    <h2>Mining Pools</h2>

    <p>
      Because the probability of individual miners finding a block is so small compared to the global
      competition, miners sometimes choose to work as a group to increase the group's chance of a profit. These
      groups are called 'Mining Pools'. All the member's hashrates are pooled together and the profits are
      split based on the hashrate that each individual miner contributes to the pool.
    </p>

    <p>
      <Link href="https://slushpool.com/en/stats/btc/">SlushPool</Link>
      is the oldest Bitcoin mining pool and at the time of this writing their hashrate represents
      ~8 of the global hashrate, around ~7 ExaHashes per second.
    </p>

    <hr>

    <InfoCard id="hashrate_table" title="Hashrate Comparison">
      <b-table-simple small class="text-right">
        <b-tbody>
          <b-tr>
            <b-td>Your Device</b-td>
            <b-td>~{{ this.yourDeviceHr }}<sub>H/s</sub></b-td>
          </b-tr>
          <b-tr>
            <b-td>Antminer S9</b-td>
            <b-td>13,000,000,000,000<sub>H/s</sub></b-td>
          </b-tr>
          <b-tr>
            <b-td>SlushPool</b-td>
            <b-td>7,000,000,000,000,000,000<sub>H/s</sub></b-td>
          </b-tr>
          <b-tr>
            <b-td>Global</b-td>
            <b-td>{{ this.globalHr.long }}<sub>H/s</sub></b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </InfoCard>
  </Page>

  <Page last slide next-section-btn data-anchor="timechain_review">
    <h1>Timechain Review</h1>

    <p>
      <b>Try setting the block time to 10 minutes to see how the target changes in relation to hashrate.</b>
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

  </Page>
</div>
</template>

<script>
import AddBlockButton from '@/components/controls/AddBlockButton.vue';
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockchainApi from '@/services/BlockchainApi';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import Difficulty from '@/components/controls/Difficulty';
import EncodingMixin from '@/mixins/EncodingMixin';
import Graph from '@/components/Graph.vue';
import InfoCard from '@/components/cards/InfoCard';
import Link from '@/components/Link';
import MiningControls from '@/components/controls/MiningControls.vue';
import Num from '@/services/Num';
import Page from '@/components/Page.vue';
import SuccessMsg from '@/components/controls/SuccessMsg';
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
    Difficulty,
    Graph,
    InfoCard,
    Link,
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
      yourDeviceHr: 0,
      globalHr: { long: '180,000,000,000,000,000,000', value: 180, unit: 'Exa' },
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
    this.setGlobalHr();
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
      const formattedHashes = this.formatHashrate(hashes.toFixed());
      this.hashrate = formattedHashes.value;
      this.hashrateUnit = formattedHashes.unit;
      this.yourDeviceHr = this.hashrate * this.hashrateConversion[this.hashrateUnit].value;
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
          return { value, unit }
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
        raw: globalHr,
        long: globalHr.toLocaleString(),
        value: Math.floor(formattedGlobalHr.value),
        unit: formattedGlobalHr.unit,
      };
    }
  }
};
</script>

<style>
#timechain_mining_slide .mining_controls {
  max-width: 305px;
}
</style>
