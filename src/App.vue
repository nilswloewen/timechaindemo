<template>
  <div id="app">

    <Graph :id="'main_graph'" :guesses="this.guesses" :target="this.target" :encoding="this.encoding"/>

    <b-container id="overlay" class="fixed-top vh-100 pt-3">
      <b-row>
        <b-col>

          <!-- Controls -->
          <b-collapse id="collapse_controls">
            <b-card no-body>

              <b-button-toolbar size="sm" class="d-inline-block">
                <b-button-group>
                  <!-- Down Arrow -->
                  <b-button style="background-color: rgba(0, 0, 0, 0.03); color: black;" v-b-toggle="['collapse_algorithm', 'collapse_controls']" class="border-0 ">
                    <b-icon-chevron-compact-down/>
                  </b-button>

                  <b-form-input id="nonce_input" @change="tryNonce" :value="this.nonce"
                                type="number" class="d-inline-block text-right"
                                style="max-width: 140px;" min="0" size="sm" />

                  <b-button @click="onIncrementNonce" variant="primary">
                    NONCE + 1
                  </b-button>

                  <b-button @click="onShowNonce" variant="info">
                    Show Winner
                  </b-button>

                  <b-button v-b-toggle.collapse_legend> Legend </b-button>
                  <b-button v-b-toggle.collapse_block_header>Header</b-button>

                  <!--                  <b-form-input id="target_range" @change="onTargetRangeChange" title="Target" type="range" min="0" max="100" step="0.1"/>-->

                  <b-button @click="onChangeEncoding" variant="info" style="min-width: 132px">Encoding</b-button>

                </b-button-group>
              </b-button-toolbar>
            </b-card>
          </b-collapse>

          <Algorithm />
          <Legend :target="this.target" :encoding="this.encoding" :hash="this.hash" :hashMax="this.hashMax"/>
          <BlockHeader v-on:updateBlock="updateBlock"/>

        </b-col>
      </b-row>
    </b-container>

    <b-container class="fixed-bottom text-center pb-3">
      <b-row >
        <b-col >
          {{  this.hashesPerSecond }} Hashes per Second
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
  import Graph from './components/Graph';
  import Legend from './components/cards/Legend';
  import BlockHeader from '@/components/cards/BlockHeader';
  import Algorithm from './components/cards/Algorithm';
  import {serializeBlockHeader, swapEndian} from './services/util.js';

  export default {
    components: {
      Algorithm,
      BlockHeader,
      Graph,
      Legend,
    },
    data () {
      return {
        wasm: { sha256_from_hex_str: () => {} },

        hashesPerSecond: '0.00',
        startTime: 0,
        tries: 0,

        block: {difficulty: 1},

        nonce: 0,
        hash: {decimal: 0, binary: 0, hexadecimal: 0, exponential: 0, xRatio: 0, yRatio: 0},
        guesses: [],

        hashMax: Object,
        target: {yRatio: 0},
        encoding: 'hexadecimal',
      }
    },

    async mounted() {
      import("wasm_sha256_from_hex_str").then((wasm) => {this.wasm = wasm; })
      .catch((err) => alert("Failed to load wasm module" + err));

      this.startTime = new Date().getTime();

      this.setHashMax();
      this.setTarget();
    },

    methods: {
      setHashMax() {
        this.hashMax = this.encode(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn);
        this.hashMax.binary = ''.padStart(256, '1');
        this.hashMax.hexadecimal = ''.padStart(64, 'f');
      },
      setTarget() {
        const targetMax = 0x00000000ffff0000000000000000000000000000000000000000000000000000n;
        const target = Number(targetMax) / Number(this.block.difficulty);
        this.target = this.encode(target);
        this.target.yRatio = (Number(this.target.bigInt) / Number(this.hashMax.bigInt)).toFixed(24);
      },
      setTargetByPercentage(percentage) {
        const target = Number(this.hashMax.bigInt) * percentage;
        this.target = this.encode(target);
        this.target.yRatio = Number(this.target.bigInt) / Number(this.hashMax.bigInt);
      },

      tryNonce(nonce) {
        this.nonce = nonce;

        // Calculate hash.
        const serializedHeader = serializeBlockHeader(this.block, nonce);
        let hash = this.wasm.sha256_from_hex_str(serializedHeader);
        hash = this.wasm.sha256_from_hex_str(hash);
        hash = swapEndian(hash);
        hash = this.encode(`0x${hash}`);
        this.hash = hash;

        // Add yRatio for Legend.
        const yRatio = parseInt(this.hash.hexadecimal, 16) / Number(this.hashMax.bigInt);
        this.hash.yRatio = yRatio;

        // Performance governor.
        if (this.guesses.length > 10) {
          this.guesses.shift();
        }

        this.guesses.push({ xRatio: 0, yRatio, hash });

        if (this.hash.bigInt < this.target.bigInt) {
          alert("YOU WIN!");
        }

        this.startTime = this.startTime === 0 ? new Date().getTime() : this.startTime;
        this.tries += 1;
        this.calcHashesPerSecond();
      },

      onIncrementNonce() {
        this.tryNonce(this.nonce + 1);
      },
      onShowNonce() {
        this.tryNonce(this.block.nonce);
      },
      onChangeEncoding(e) {
        switch (this.encoding) {
          case 'hexadecimal':
            this.encoding = 'decimal';
            e.target.innerText = 'Decimal';
            break;
          case 'decimal':
            this.encoding = 'exponential';
            e.target.innerText = 'Exponential';
            break;
          case 'exponential':
            this.encoding = 'binary';
            e.target.innerText = 'Binary';
            break;
          case 'binary':
          default:
            this.encoding = 'hexadecimal';
            e.target.innerText = 'Hexadecimal';
            break;
        }
      },
      onTargetRangeChange(val) {
        const value = Number(val);
        this.setTargetByPercentage(value / 100);
      },

      updateBlock(block) {
        this.block = block;
        this.setTarget();
      },

      encode(val) {
        // eslint-disable-next-line no-undef
        const bigInt = BigInt(val);
        return {
          bigInt,
          binary: bigInt.toString(2).padStart(256, '0'),
          decimal: bigInt.toLocaleString('en-US').padStart(103, '000,'),
          exponential: Number(bigInt).toExponential(),
          hexadecimal: bigInt.toString(16).padStart(64, '0'),
        }
      },

      calcHashesPerSecond() {
        const elapsed = new Date().getTime() - this.startTime;
        const hps = (this.tries / elapsed) * 1000;
        this.hashesPerSecond = String(hps).substr(0, 4)
        setTimeout(this.calcHashesPerSecond, 1000);
      },
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Fira%20Code:wght@300..700&display=swap');
  body{
    /* Hide scrollbars */
    overflow: hidden;
    font-size: 16px;
    font-family: 'Fira Code', monospace;
  }

  .card,
  .card-body .list-group {
    margin-top: .5em;
    margin-bottom: .5em;
  }
</style>

