<template>
  <div id="app">

    <Graph :id="'main_graph'" :guesses="this.guesses" :target="this.target" :encoding="this.encoding"/>

    <b-container id="overlay" class="fixed-top vh-100 pt-3">
      <b-row>
        <b-col>

          <b-collapse id="collapse_controls" visible>
            <b-card no-body>

              <b-button-toolbar size="sm" class="w-100">
                <b-button-group class="w-100">

                  <!-- Down Arrow -->
                  <b-dropdown style="background-color: rgba(0, 0, 0, 0.03); color: black; max-width: 42px;"  class="border-0 ">
                    <b-dropdown-item-btn v-b-toggle="['collapse_algorithm']"> Algorithm</b-dropdown-item-btn>
                    <b-dropdown-item-btn v-b-toggle="['collapse_block_header']">Block Header</b-dropdown-item-btn>
                    <b-dropdown-item-btn v-b-toggle="['collapse_block_chain']">Blockchain</b-dropdown-item-btn>
                    <b-dropdown-item-btn v-b-toggle="['collapse_hash']">Hash</b-dropdown-item-btn>
                    <b-dropdown-item-btn v-b-toggle="['collapse_legend']">Legend</b-dropdown-item-btn>
                    <b-dropdown-item-btn v-b-toggle="['collapse_welcome']">Welcome</b-dropdown-item-btn>
                  </b-dropdown>

                  <b-form-input id="nonce_input" @change="tryNonce" v-model="nonce"
                                type="number" pattern="[0-9]*" min="0" max="4294967295"
                                style="max-width: 140px; text-align: right;" />

                  <b-button @click="onIncrementNonce" variant="primary">
                    NONCE + 1
                  </b-button>

                  <b-button @click="onShowNonce" variant="info">
                    Solve
                  </b-button>

                  <b-button v-b-toggle.collapse_legend> Legend </b-button>

                  <!--                  <b-form-input id="target_range" @change="onTargetRangeChange" title="Target" type="range" min="0" max="100" step="0.1"/>-->

                </b-button-group>
              </b-button-toolbar>
            </b-card>
          </b-collapse>

          <Algorithm />
          <BlockHeader v-on:updateBlock="updateBlock"/>
          <BlockChain/>
          <Hash/>
          <Legend :target="this.target" :encoding="this.encoding" v-on:rotateEncoding="rotateEncoding"
                  :hash="this.hash" :hashMax="this.hashMax"/>
          <Welcome/>

        </b-col>
      </b-row>
    </b-container>

    <b-container class="fixed-bottom text-center pb-3">
      <b-row >
        <b-col >
          <span id="hps"/> Hashes per Second
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
  import Algorithm from './components/cards/Algorithm';
  import BlockChain from '@/components/cards/BlockChain';
  import BlockHeader from '@/components/cards/BlockHeader';
  import Graph from './components/Graph';
  import Hash from '@/components/cards/Hash';
  import Legend from './components/cards/Legend';
  import Welcome from '@/components/cards/Welcome';
  import {serializeBlockHeader, sha256d_from_hex } from '@/services/utils';

  // Not sure why this didn't work in vue object. It was updating far too often.
  let tries = 0;
  let startTime= new Date().getTime();
  function calcHashesPerSecond() {
    const elapsed = new Date().getTime() - startTime;
    const hps = (tries / elapsed) * 1000;
    const hashesPerSecond = String(hps).substr(0, 4);
    const hps_span = document.getElementById('hps');
    if (hps_span) {
      hps_span.innerText = hashesPerSecond;
    }
    setTimeout(calcHashesPerSecond, 1000);
  }
  calcHashesPerSecond();

  export default {
    components: {
      Algorithm,
      BlockHeader,
      BlockChain,
      Graph,
      Hash,
      Legend,
      Welcome,
    },
    data () {
      return {
        block: {difficulty: 1},

        nonce: 0,
        hash: {decimal: 0, binary: 0, hexadecimal: 0, exponential: 0, xRatio: 0, yRatio: 0},
        guesses: [],

        hashMax: Object,
        target: {yRatio: 0},
        encoding: ['hexadecimal', 'decimal', 'exponential', 'binary'],
      }
    },

    async mounted() {
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
        let hash = await sha256d_from_hex(serializedHeader);
        hash = this.encode(`0x${hash}`);
        this.hash = hash;

        // Add yRatio for Legend.
        const yRatio = parseInt(this.hash.hexadecimal, 16) / Number(this.hashMax.bigInt);
        this.hash.yRatio = yRatio;

        this.guesses.push({ xRatio: 0, yRatio, hash });

        if (this.hash.bigInt < this.target.bigInt) {
          alert("YOU WIN!");
        }

        this.startTime = this.startTime === 0 ? new Date().getTime() : this.startTime;
        tries += 1;
      },

      onIncrementNonce() {
        this.nonce = this.nonce + 1;
        this.tryNonce(this.block.nonce);
      },
      onShowNonce() {
        this.nonce = this.block.nonce;
        this.tryNonce();
      },

      onTargetRangeChange(val) {
        const value = Number(val);
        this.setTargetByPercentage(value / 100);
      },

      rotateEncoding() {
        this.encoding.push(this.encoding.shift());
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
          exponential: Number(val).toExponential(),
          hexadecimal: bigInt.toString(16).padStart(64, '0'),
        }
      },
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Fira%20Code:wght@300..700&display=swap');
  body{
    overflow: hidden;
  }
  #app {
    font-size: 16px;
    font-family: 'Fira Code', monospace;
  }

  .card {
    min-width: 660px;
    max-width: 660px;
  }
  .card-body {
    overflow-y: auto;
    max-height: 70vh;
  }
  .card
  {
    margin-top: .5em;
    /*margin-bottom: .5em;*/
  }
</style>

