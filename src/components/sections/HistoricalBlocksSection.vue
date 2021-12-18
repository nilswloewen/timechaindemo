<template>
<div id="historical_blocks_section" class="section">
  <Page data-anchor="real_blocks" first prev-section-btn slide>
    <h1>Real Bitcoin Mining</h1>

    <p>
      The 'data' in real mining includes the <b>Version</b> of the bitcoin software used to create the block, a
      recording of the target in a format called <b>Bits</b>, and a record of the transactions in
      the block called a <b>Merkle Root</b>. For more information on each field see
      <Link href="https://developer.bitcoin.org/reference/block_chain.html">here</Link>
      .
    </p>

    <BlockCard
      :block="block"
      :local-encoding="encoding[activeEncoding]"
      mask-nonce
      showBlockHeightInput
      showNonce
      showReal
      v-on:rotate-encoding="rotateEncoding"
      v-on:mine-this-block="mineThisBlock"
      v-on:update-block-height="updateBlockHeight"
      v-on:update-block-height-latest="updateBlockHeightLatest"/>

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
      v-on:rotate-encoding="rotateEncoding"/>
  </Page>

  <div id="real_mining_slide" class="slide" data-anchor="real_mining">
    <Graph id="real_mining_canvas" :guesses="this.guesses"
           :local-encoding="encoding[activeEncoding]" :target="this.target" animate/>

    <div class="overlay">
      <b-container>
        <b-row>
          <b-col>
            <MiningControls v-if="!block.isHashValid"
                            :block="block"
                            :hash-max="hashMax"
                            :index="block.height"
                            :is-mining="isMining"
                            :local-encoding="encoding[activeEncoding]"
                            :target="target"
                            collapse="historical_mining"
                            encoding-btn
                            interactive-nonce
                            show-go-brrr
                            show-solution-btn
                            type="historical"
                            v-on:rotate-encoding="rotateEncoding"
                            v-on:start-mining="startMining"
                            v-on:stop-mining="stopMining"
                            v-on:show-solution="showSolution"
                            v-on:update-nonce="updateNonce"/>

            <div class="nav_btn_mining_wrapper">
              <b-button class="nav_btn previous" size="sm" @click="previousSlide">
                <b-icon-arrow-left/>
                Prev
              </b-button>

              <b-button class="next_section mining" size="sm" @click="nextSection">
                Next
                <b-icon-arrow-down/>
              </b-button>
            </div>

          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>

</div>
</template>

<script>
import BlockCard from '@/components/cards/BlockCard.vue';
import MiningControls from '@/components/controls/MiningControls';
import SuccessMsg from '@/components/controls/SuccessMsg';
import Target from '@/components/controls/Target';
import Graph from '@/components/Graph';
import Link from '@/components/Link';
import Page from '@/components/Page.vue';
import EncodingMixin from '@/mixins/EncodingMixin';
import TargetMixin from '@/mixins/TargetMixin';
import Block from '@/services/block/Block';
import BlockHeader from '@/services/block/BlockHeader';
import Mempool from '@/services/Mempool';
import Num from '@/services/Num';

export default {
  mixins: [
    EncodingMixin,
    TargetMixin,
  ],
  components: {
    Link,
    BlockCard,
    Graph,
    MiningControls,
    Page,
    SuccessMsg,
    Target,
  },
  data() {
    return {
      block: new Block('', BlockHeader.genesis, 0),
      guesses: [],
      hideNonce: false,
      isMining: false,
      mempool: new Mempool(),
      originalNonce: 0,
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
      this.block.tries += 1;
      await this.block.calcHash();
      this.block.isHashValid = this.block.hash.bigInt < this.target.bigInt;

      this.guesses.push({
        xRatio: 0,
        yRatio: this.block.hash.num / this.hashMax.num,
        hash: this.block.hash,
        isHashValid: this.block.isHashValid,
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
      const target = coefficient.padEnd(bytes, '0');
      return new Num(BigInt(`0x${ target }`), 64);
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

    async startMining() {
      this.isMining = true;
      this.block.startTime = performance.now();
      await this.mine();
      this.isMining = false;
    },

    async mine() {
      this.block.tries += 1;
      await this.updateNonce(this.block.header.nonce += 1);

      const elapsed = performance.now() - this.block.startTime;
      this.block.timeToMine = (elapsed / 1000);

      if (!this.block.isHashValid && this.isMining) {
        await this.mine();
      }
    },

    stopMining() {
      this.isMining = false;
    },
  },
};
</script>

<style>
#historical_blocks_section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/brain_man.webp');
}
</style>
