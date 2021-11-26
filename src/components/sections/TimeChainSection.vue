<template>
  <div id="timechain_section" class="section">
    <Page data-anchor="timechain" slide>
      <h1>Timechain</h1>

      <b-card>
        <q>The only way to find a valid proof-of-work is by making a lot of guesses,
          and making a single guess takes a little bit of time. The probabilistic
          sum of these guesses is what builds up the timechain that is Bitcoin.</q>
        - <a href="https://dergigi.com/2021/01/14/bitcoin-is-time/">DerGigi</a>
      </b-card>

      <p>
        We've shown that by adjusting the target it becomes more difficult to
        find a valid hash. More tries requires more <b>time</b>.
      </p>

      <p>
        Mining hardware is rated by how many hashes it can find per second, this
        is known as the <b>hashrate</b> or H/s (hashes per second).
      </p>

      <p>
        This demo on this device has a hashrate of ~<b>{{ hpsOfThisDevice.toFixed(0) }}<sub>H/s</sub></b>.
      </p>

      <b-card header="Hashrate comparison" header-bg-variant="info">
        <table id="hashrate_table">
          <tr>
            <td> This device </td>
            <td> ~{{ hpsOfThisDevice.toFixed(0) }}<sub>H/s</sub> </td>
          </tr>
          <tr>
            <td>
              <a href="https://shop.bitmain.com/product/detail?pid=00020211108151254046rPQ0VCqe069D">
                Antminer S19j Pro
              </a>
            </td>
            <td> ~104,000,000,000,000<sub>H/s</sub> </td>
          </tr>
          <tr>
            <td> <a href="https://www.blockchain.com/charts/hash-rate">Global</a> </td>
            <td> ~{{ globalHashRate }}<sub>H/s</sub> </td>
          </tr>
        </table>
      </b-card>
    </Page>

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
import EncodingMixin from '@/mixins/EncodingMixin';
import Graph from '@/components/Graph.vue';
import MiningControls from '@/components/controls/MiningControls.vue';
import Page from '@/components/Page.vue';
import Target from '@/components/controls/Target.vue';
import TargetMixin from '@/mixins/TargetMixin';
import BlockchainApi from '@/services/BlockchainApi'

export default {
  mixins: [
    BlockchainMixin,
    EncodingMixin,
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
      encoding: ['binary', 'decimal', 'hexadecimal', 'exponential'],
      globalHashRate: '143,146,528,833,000,000,000',
    };
  },
  async mounted() {
    await this.calibrateHps();
    // Disable until launch
    // const gigaHashRate = await BlockchainApi.getHashRate();
    // this.globalHashRate = (gigaHashRate * 1_000_000_000).toLocaleString('en-Us');
  },
  methods: {
    onNonceChange(nonce) {
      this.blocks[this.blockToMine].header.nonce = Number(nonce);
      this.finalizeBlock(this.blockToMine)
    },
  },
};
</script>

<style>
  #hashrate_table {
    width: 100%;
  }
  #hashrate_table tr td:last-child {
    text-align: right;
  }
</style>
