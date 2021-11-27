<template>
<div id="app">

  <Graph :guesses="this.guesses" :target="this.target" :encoding="this.encoding"/>

  <b-container id="overlay" class="fixed-top vh-100 pt-3">
    <b-row>
      <b-col>

        <b-button-toolbar size="sm" class="justify-content-center">

          <!-- Down Arrow -->
          <b-dd style="background-color: rgba(0, 0, 0, 0.03); color: black; max-width: 42px;"
                class="border-0 float-start">
            <b-dd-item-btn v-b-toggle="['collapse_algorithm']">Algorithm</b-dd-item-btn>
            <b-dd-item-btn v-b-toggle="['collapse_block_header']">Block Header</b-dd-item-btn>
            <b-dd-item-btn v-b-toggle="['collapse_block_chain_overview']">
              Blockchain
            </b-dd-item-btn>
            <b-dd-item-btn v-b-toggle="['collapse_controls']">Controls</b-dd-item-btn>
            <b-dd-item-btn v-b-toggle="['collapse_hash']">Hash</b-dd-item-btn>
            <b-dd-item-btn v-b-toggle="['collapse_legend']">Legend</b-dd-item-btn>
            <b-dd-item-btn v-b-toggle="['collapse_welcome']">Welcome</b-dd-item-btn>
          </b-dd>

          <b-collapse id="collapse_controls">
            <b-input-group prepend="Nonce">
              <b-form-input @change="tryNonce" v-model.number="nonce" type="number"
                            pattern="[0-9]*" min="0" max="4294967295"
                            style="max-width: 140px; text-align: right;"/>

              <b-button @click="onIncrementNonce" variant="secondary">
                + 1
              </b-button>

              <b-button @click="onShowNonce" variant="warning">
                Solve
              </b-button>
            </b-input-group>
          </b-collapse>

        </b-button-toolbar>

        <Algorithm/>
        <BlockHeader v-on:updateBlock="updateBlock"/>
        <BlockchainOverview/>
        <Hash/>
        <Legend :target="this.target" :encoding="this.encoding" :hash="this.hash"
                v-on:rotateEncoding="rotateEncoding" :hashMax="this.hashMax"/>
        <Welcome/>

      </b-col>
    </b-row>
  </b-container>

  <b-container class="fixed-bottom text-center pb-3">
    <b-row>
      <b-col>
        <span id="hps"/> Hashes per Second
      </b-col>
    </b-row>
  </b-container>

</div>
</template>

<script>
import Algorithm from './components/cards/Algorithm.vue';
import BlockchainOverview from '@/components/cards/BlockchainOverview.vue';
import BlockHeader from '@/components/cards/BlockHeader.vue';
import Graph from './components/Graph.vue';
import Hash from '@/components/cards/Hash.vue';
import Legend from './components/cards/Legend.vue';
import Welcome from '@/components/cards/Welcome.vue';
import { serializeBlockHeader, sha256dFromHex } from '@/services/sha256_utils';

// Not sure why this didn't work in vue object. It was updating far too often.
let tries = 0;
const startTime = new Date().getTime();

function calcHashesPerSecond() {
  const hpsSpan = document.getElementById('hps');
  if (hpsSpan) {
    const elapsed = (new Date().getTime() - startTime) * 1000;
    hpsSpan.innerText = String(tries / elapsed).substr(0, 4);
  }
  setTimeout(calcHashesPerSecond, 1000);
}

calcHashesPerSecond();

export default {
  components: {
    Algorithm,
    BlockHeader,
    BlockchainOverview,
    Graph,
    Hash,
    Legend,
    Welcome
  },
  data() {
    return {
      block: {difficulty: 1},

      nonce: 0,
      hash: {
        decimal: 0, binary: 0, hexadecimal: 0, exponential: 0, xRatio: 0, yRatio: 0
      },
      guesses: [],

      hashMax: Object,
      target: {yRatio: 0},
      encoding: ['hexadecimal', 'decimal', 'exponential', 'binary']
    };
  },

  async mounted() {
    this.setHashMax();
    this.setTarget();
  },

  methods: {
    setHashMax() {
      this.hashMax = this.encode(
        0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn
      );
      this.hashMax.binary = ''.padStart(256, '1');
      this.hashMax.hexadecimal = ''.padStart(64, 'f');
    },
    setTarget() {
      const targetMax = 0x00000000ffff0000000000000000000000000000000000000000000000000000n;
      const target = Number(targetMax) / Number(this.block.difficulty);
      this.target = this.encode(target);
      this.target.yRatio = Number(this.target.bigInt) / Number(this.hashMax.bigInt);
    },
    setTargetByPercentage(percentage) {
      const target = Number(this.hashMax.bigInt) * percentage;
      this.target = this.encode(target);
      this.target.yRatio = Number(this.target.bigInt) / Number(this.hashMax.bigInt);
    },

    async tryNonce() {
      // Calculate hash.
      const serializedHeader = serializeBlockHeader(this.block, this.nonce);
      let hash = await sha256dFromHex(serializedHeader);
      hash = this.encode(`0x${ hash }`);
      this.hash = hash;

      // Add yRatio for Legend.
      const yRatio = parseInt(this.hash.hexadecimal, 16) / Number(this.hashMax.bigInt);
      this.hash.yRatio = yRatio;

      this.guesses.push({xRatio: 0, yRatio, hash});

      if (this.hash.bigInt < this.target.bigInt) {
        // eslint-disable-next-line no-alert
        alert('YOU WIN!');
      }

      this.startTime = this.startTime === 0 ? new Date().getTime() : this.startTime;
      tries += 1;
    },

    onIncrementNonce() {
      this.nonce += 1;
      this.tryNonce(this.block.nonce);
    },
    onShowNonce() {
      this.nonce = this.block.nonce;
      this.tryNonce();
    },
    updateBlock(block) {
      this.block = block;
      this.setTarget();
    },

    encode(val) {
      const bigInt = BigInt(val);
      return {
        bigInt,
        binary: bigInt.toString(2).padStart(256, '0'),
        decimal: bigInt.toLocaleString('en-US').padStart(103, '000,'),
        exponential: Number(val).toExponential(),
        hexadecimal: bigInt.toString(16).padStart(64, '0')
      };
    },
    rotateEncoding() {
      this.encoding.push(this.encoding.shift());
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira%20Code:wght@300..700&display=swap');

body {
  overflow: hidden;
}

#app {
  font-size: 16px;
  font-family: 'Fira Code', monospace;
}

.card {
  /*min-width: 660px;*/
  max-width: 660px;
}

.card-body {
  overflow-y: auto;
  max-height: 90vh;
}

.card {
  margin-top: .5em;
  /*margin-bottom: .5em;*/
}

.list-field {
  border-bottom: none;
}
</style>
