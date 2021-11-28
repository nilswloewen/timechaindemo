<template>
<div id="timechain_section" class="section">
<!--  <Page data-anchor="timechain" slide>-->
<!--    <h1>Timechain</h1>-->

<!--    <b-card>-->
<!--      <q>The only way to find a valid proof-of-work is by making a lot of guesses,-->
<!--        and making a single guess takes a little bit of time. The probabilistic-->
<!--        sum of these guesses is what builds up the timechain that is Bitcoin.</q>-->
<!--      - <a href="https://dergigi.com/2021/01/14/bitcoin-is-time/">DerGigi</a>-->
<!--    </b-card>-->

<!--    <p>-->
<!--      We've shown that by adjusting the target it becomes more difficult to-->
<!--      find a valid hash. More tries requires more <b>time</b>.-->
<!--    </p>-->

<!--    <p>-->
<!--      Remember, if a miner finds a valid hash they are rewarded with btc, so the incentive is-->
<!--      to mine as many blocks as possible to increase their profits. Not only are their miners running 24/7,-->
<!--      to increase their chance of success they find ways to increase their computing power.-->
<!--    </p>-->

<!--    <p>-->
<!--      This leads to a global arms race as Bitcoin mining is open to anyone, anywhere. As each miner upgrades their-->
<!--      hardware and increases their mining capacity, every other miner must do the same to keep up or else the-->
<!--      probability of their success dwindles.-->
<!--    </p>-->

<!--    <p>-->
<!--      The longest chain is considered to be the truth because the most work went into calculating it.-->
<!--      If miners could find more blocks per minute than other, the could create the longest chain and-->
<!--      then control the ledger.-->
<!--    </p>-->

<!--    <p>-->
<!--      To prevent this, the Bitcoin network self-adjusts the target required for each block to ensure that-->
<!--      blocks are always added to the chain at 10 minute intervals.-->
<!--    </p>-->

<!--    <p>-->
<!--      Mining capacity is rated by how many hashes a miner can find per second, this-->
<!--      is known as the <b>hashrate</b> or H/s (hashes per second).-->
<!--    </p>-->

<!--    <p>-->
<!--      This demo on this device has a max hashrate of ~<b>{{ hpsOfThisDevice.toFixed(0) }}<sub>H/s</sub></b>.-->
<!--    </p>-->

<!--    <b-card header="Hashrate comparison" header-bg-variant="info">-->
<!--      <table id="hashrate_table">-->
<!--        <tr>-->
<!--          <td> This device</td>-->
<!--          <td> ~{{ hpsOfThisDevice.toFixed(0) }}<sub>H/s</sub></td>-->
<!--        </tr>-->
<!--        <tr>-->
<!--          <td>-->
<!--            <a href="https://shop.bitmain.com/product/detail?pid=00020211108151254046rPQ0VCqe069D">-->
<!--              Antminer S19j Pro-->
<!--            </a>-->
<!--          </td>-->
<!--          <td> ~104,000,000,000,000<sub>H/s</sub></td>-->
<!--        </tr>-->
<!--        <tr>-->
<!--          <td><a href="https://www.blockchain.com/charts/hash-rate">Global</a></td>-->
<!--          <td> ~{{ globalHashRate }}<sub>H/s</sub></td>-->
<!--        </tr>-->
<!--      </table>-->
<!--    </b-card>-->
<!--  </Page>-->

  <Page data-anchor="difficulty_adjustment" slide encoding-btn
        :active-encoding="activeEncoding"
        :encoding="encoding"
        v-on:rotate-encoding="rotateEncoding"
        v-on:update-active-encoding="updateActiveEncoding">

    <h1>Difficulty Adjustment</h1>

    <p>
      This is the Crème de la crème, cherry-on-top engineering marvel of Bitcoin.
    </p>

    <b-card>
      <q>To compensate for increasing hardware speed and varying interest in running nodes over time,
        the proof-of-work difficulty is determined by a moving average targeting an average number of
        blocks per hour. If they're generated too fast, the difficulty increases.</q>
      <br> - <a href="https://bitcoin.org/bitcoin.pdf">Satoshi Nakamoto</a>
    </b-card>

    <b-card no-body>
      <b-card-header header-bg-variant="info">
        <b-icon-wrench/>
        Difficulty
      </b-card-header>

      <b-card-body class="text-center">
        <p>
          This device can calculate <b>~{{ hpsOfThisDevice.toFixed(0) }}</b><sub>H/s</sub>
          <b-button @click="calibrateHps" size="sm"> <b-icon-wrench/> </b-button>
        </p>

        <p>
          <b-input-group id="hashrate_picker" size="sm" append="H/s">
            <b-form-input id="hashrate_input" type="number" size="sm"
                          style="text-align: right;" :value="hashrate" :min="1" @change="updateHashrate"/>
            <b-form-select id="hashrate_units_select" size="sm" @change="updateHashrateUnit"
                           :value="hashrateUnit" :options="hashrateUnits"/>
          </b-input-group>
          {{ getHashrate }}<sub>H/s</sub>
        </p>

        <p>
          Block Time: (Average time to find valid block)
        </p>

        <b-input-group id="time_picker">
          <b-form-input id="time_input" type="number" size="sm"
                        style="text-align: right;" :value="time" :min="1" @change="updateTime"/>
          <b-form-select id="time_units_select" size="sm" @change="updateTimeUnit" :value="timeUnit" :options="timeUnits"/>
        </b-input-group>
      </b-card-body>
    </b-card>

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

    <b-card>
      <q>In other words, the difficulty-adjustment is about keeping a constant
        time, not a constant level of security, difficulty, or energy expenditure.</q>
      - DerGigi
    </b-card>
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

  <div class="slide" data-anchor="timechain_graph" id="timechain_graph_slide">
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
import Target from '@/components/controls/Target.vue';
import TargetMixin from '@/mixins/TargetMixin';
import Num from '@/services/Num';

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
      blockToMine: 0,
      encoding: ['binary', 'decimal', 'hexadecimal', 'exponential'],
      globalHashRate: '143,146,528,833,000,000,000',
      hexDigits: 2,
      hashrate: 42,
      hashrateUnit: 'base',
      hashrateUnits: [
        'base',
        'Kilo',
        'Mega',
        'Giga',
        'Tera',
        'Peta',
        'Exa',
        'Zeta',
        'Yotta',
      ],
      hashrateConversion: {
        base: { other: '',             value: 1 },
        Kilo: { other: 'Thousand',     value: 1_000 },
        Mega: { other: 'Million',      value: 1_000_000 },
        Giga: { other: 'Billion',      value: 1_000_000_000 },
        Tera: { other: 'Trillion',     value: 1_000_000_000_000 },
        Peta: { other: 'Quadrillion',  value: 1_000_000_000_000_000 },
        Exa:  { other: 'Quintillion',  value: 1_000_000_000_000_000_000 },
        Zeta: { other: 'Sextillion',   value: 1_000_000_000_000_000_000_000 },
        Yotta: { other: 'Septillion',  value: 1_000_000_000_000_000_000_000_000 },
      },
      isMining: false,
      time: 10,
      timeUnit: 'Minutes',
      timeUnits: ['Seconds', 'Minutes', 'Hours', 'Days', 'Weeks', 'Months', 'Years'],
      isAdjustingTarget: false,
    };
  },
  computed: {
    getHashrate() {
      const hashrate = this.hashrate * this.hashrateConversion[this.hashrateUnit].value;
      return hashrate.toLocaleString();
    }
  },
  async mounted() {
    // await this.calibrateHps();
    // this.calcAvgTime();
    // Disable until launch
    // const gigaHashRate = await BlockchainApi.getHashRate();
    // this.globalHashRate = (gigaHashRate * 1_000_000_000).toLocaleString('en-Us');
  },
  methods: {
    onNonceChange(nonce) {
      this.blocks[this.blockToMine].header.nonce = Number(nonce);
      this.finalizeBlock(this.blockToMine);
    },
    updateHashrate(newHashrate) {
      this.hashrate = newHashrate || 1;
      this.calcTarget();
    },
    updateHashrateUnit(newHashrateUnit) {
      this.hashrateUnit = newHashrateUnit;
      this.calcTarget();
    },
    updateTime(newTime) {
      this.time = Number(newTime);
      this.calcTarget();
    },
    updateTimeUnit(newTimeUnit) {
      this.timeUnit = newTimeUnit;
      this.calcTarget();
    },

    calcTarget() {
      const hashrate = this.hashrate * this.hashrateConversion[this.hashrateUnit].value;
      const desiredSeconds = this.timeToSeconds(this.time, this.timeUnit);
      const desiredAvgHashes = desiredSeconds * hashrate;
      const { hexDigits, target } = this.findTargetAndMax(Number(desiredAvgHashes));
      this.updateHexDigits(hexDigits);
      this.target = new Num(BigInt(target), this.hexDigits);
      this.calcStats()
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
        while(target > 1) {
          target = Math.floor(target / 2);
          avgHashes = 1 / (target / max);

          if (desiredAvgHashes < avgHashes) {
            // Increment up to closest match.
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
    },

    calcAvgTime() {
      if (this.isAdjustingTarget) {
        return;
      }
      const seconds = Math.ceil((1 / this.hpsOfThisDevice) * this.avgHashes);
      const { val, unit } = this.secondsToTime(seconds);

      this.time = val;
      this.timeUnit = unit;
    },

    timeToSeconds(time, unit){
      switch(unit) {
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
        return {val: seconds, unit: 'Seconds'};
      }

      const hour = minute * 60;
      if (seconds < hour) {
        return {val: Math.floor(seconds / minute), unit: 'Minutes'};
      }

      const day = hour * 24;
      if (seconds < day) {
        return {val: Math.floor(seconds / hour), unit: 'Minutes'};
      }

      const week = day * 7;
      if (seconds < week) {
        return {val: Math.floor(seconds / day), unit: 'Days'};
      }

      const month = day * 30;
      if (seconds < month) {
        return {val: Math.floor(seconds / week), unit: 'Weeks'};
      }

      const year = day * 365;
      if (seconds < year) {
        return {val: Math.floor(seconds / month), unit: 'Months'};
      }

      const years = Math.floor(seconds / year);
      if (years < 1_000_000_000) {
        return {val: years.toLocaleString('en-US'), unit: 'Years'};
      }
      return {val: years.toExponential(2), unit: 'Years'};
    },

  }
};
</script>

<style>
#hashrate_table {
  width: 100%;
}

#hashrate_table tr td:last-child {
  text-align: right;
}

#time_input, #hashrate_input,
#time_units_select, #hashrate_units_select {
  width: 96px;
  max-width: 96px;
}
</style>
