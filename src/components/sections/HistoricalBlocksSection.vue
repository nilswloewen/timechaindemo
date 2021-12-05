<template>
<div class="section">
  <Page data-anchor="real_blocks" slide>
    <h1>Real Bitcoin Mining</h1>

    <p>
      The demo section is over. So how hard can it really be? Use the following slides to try re-mine a
      real Bitcoin block yourself!
    </p>

    <hr>

    <p>
      The 'data' in real mining includes the <b>Version</b> of the bitcoin software used to create the block, a
      recording of the target in a format called <b>Bits</b>, and a record of the transactions in
      the block called a <b>Merkle Root</b>. For more information on each field see
      <a href="https://developer.bitcoin.org/reference/block_chain.html">here</a>.
    </p>

    <BlockCard :block="block"
               :local-encoding="encoding[activeEncoding]"
               showBlockHeightInput
               showReal
               showNonce
               mask-nonce
               v-on:rotate-encoding="rotateEncoding"
               v-on:mine-this-block="mineThisBlock"
               v-on:update-block-height="updateBlockHeight"
               v-on:update-block-height-latest="updateBlockHeightLatest"/>

    <Target :avgHashes="avgHashes"
            :denominator="denominator"
            :hash-max="hashMax"
            :localEncoding="encoding[activeEncoding]"
            :numerator="numerator"
            :probability="probability"
            hide-range
            :target="target"
            :targetMax="targetMax"
            v-on:rotate-encoding="rotateEncoding" />
  </Page>

  <div class="slide" data-anchor="real_mining" id="real_mining_slide">
    <div class="fp-bg"/>

    <Graph id="real_mining_canvas" animate
           :guesses="this.guesses" :target="this.target" :local-encoding="encoding[activeEncoding]"/>
    <div class="overlay">
      <b-container>
        <b-row>
          <b-col>
            <MiningControls
              :block="block"
              :hash-max="hashMax"
              :index="block.height"
              :local-encoding="encoding[activeEncoding]"
              :target="target"
              show-solution-btn
              show-go-brrr
              interactive-nonce
              v-on:rotate-encoding="rotateEncoding"
              v-on:start-mining="startMining"
              v-on:stop-mining="stopMining"
              v-on:show-solution="showSolution"
              v-on:update-nonce="updateNonce" />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>

</div>
</template>

<script>
import Block from '@/services/block/Block';
import BlockCard from '@/components/controls/BlockCard.vue';
import BlockHeader from '@/services/block/BlockHeader';
import EncodingMixin from '@/mixins/EncodingMixin';
import Graph from '@/components/Graph';
import Mempool from '@/services/Mempool';
import MiningControls from '@/components/controls/MiningControls';
import Num from '@/services/Num';
import Page from '@/components/Page.vue';
import SuccessMsg from '@/components/controls/SuccessMsg';
import Target from '@/components/controls/Target';
import TargetMixin from '@/mixins/TargetMixin';

export default {
  mixins: [
    EncodingMixin,
    TargetMixin
  ],
  components: {
    BlockCard,
    Graph,
    MiningControls,
    Page,
    SuccessMsg,
    Target,
  },
  data() {
    return {
      guesses: [],
      block: new Block('', BlockHeader.genesis, 0),
      mempool: new Mempool(),
      isMining: false,
      originalNonce: 0,
      hideNonce: false,
    };
  },
  async mounted() {
    await this.block.calcHash();
    this.originalNonce = this.block.header.nonce;
    this.block.isHashValid = false;
    this.block.header.nonce = 0;
    this.setTarget();
  },
  methods: {
    async updateNonce(nonce) {
      this.block.header.nonce = nonce;
      await this.block.calcHash();
      this.block.isHashValid = this.block.hash.bigInt < this.target.bigInt;

      this.guesses.push({
        xRatio: 0,
        yRatio: this.block.hash.num / this.hashMax.num,
        hash: this.block.hash,
        isHashValid: this.block.isHashValid
      });
    },
    async updateBlockHeight(height) {
      const id = await this.mempool.getBlockIdFromHeight(height);
      this.block = await this.mempool.getBlockById(id);
      await this.block.calcHash();
      this.block.isHashValid = false;
      this.originalNonce = this.block.header.nonce;
      this.block.header.nonce = 0;
      this.setTarget();
    },
    async updateBlockHeightLatest() {
      const id = await this.mempool.getLatestBlockHash();
      this.block = await this.mempool.getBlockById(id);
      await this.block.calcHash();
      this.block.isHashValid = false;
      this.originalNonce = this.block.header.nonce;
      this.block.header.nonce = 0;
      this.blockHeightMax = this.block.height;
      this.setTarget();
    },
    bitsToTarget(bits) {
      const hex = bits.toString(16).padStart(8, '0');
      const exponent = hex.slice(0, 2);
      const coefficient = hex.slice(2);

      const bytes = parseInt(exponent, 16) * 2;
      const target = coefficient.padEnd(bytes , '0');
      return new Num(BigInt(`0x${target}`), 64);
    },
    setTarget() {
      this.target = this.bitsToTarget(this.block.header.bits);
      this.hashMax = new Num(BigInt('0x'.padEnd(66, 'f')), 64);
      this.targetMax = this.hashMax;
      this.calcStats();
    },
    mineThisBlock() {
      fullpage_api.moveSlideRight();
    },
    showSolution() {
      this.updateNonce(this.originalNonce);
    },
    stopMining() {
      this.isMining = false;
    },
    async startMining() {
      const startTime = performance.now();
      this.isMining = true;
      this.block.tries = 0;

      while (!this.block.isHashValid && this.isMining) {
        this.block.tries += 1;
        await this.updateNonce(this.block.header.nonce += 1);
        const elapsed = performance.now() - startTime;
        this.block.timeToMine = (elapsed / 1000).toFixed(2);
      }

      this.isMining = false;
    },
  }
};
</script>
