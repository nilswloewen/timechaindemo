<template>
  <b-collapse id="collapse_blockchain_pow" visible>
    <h4>
      Example 2: Proof-of-Work Blockchain
    </h4>

    <p>
      Here we add one new field to the block called a <b>Nonce</b>, which is shorthand for 'a number used only once'. Also, the block hash is now required to meet a certain criteria: we will interpret the hash as a number and only consider it valid if it is less than the target.
    </p>

    <!-- Target -->
    <b-card class="text-center">
      <h4>Target</h4>

      We will only accept <b>{{ this.targetProbability }}%</b> of possible hashes.
      <br/>
      Each try has a <b>{{ this.targetNumerator }}</b> out of <b>{{ this.targetDenominator }}</b> chance of winning.
      <hr>
      <div class="text-center">
        Min 0
        <b-form-input v-model="target" title="Target" type="range" min="0" max="255" style="min-width: 50%"/>
        Max 255
      </div>
      <table id="target_table" class="m-auto">
        <tr><th>Encoding</th>    <th>Base</th> <th>Value</th></tr>
        <tr><td>Decimal</td>     <td>10</td>   <td>{{ Number(target).toString() }}</td></tr>
        <tr><td>Hexadecimal</td> <td>16</td>   <td>{{ Number(target).toString(16).padStart(2, '0') }}</td></tr>
        <tr><td>Binary</td>       <td>2</td>   <td>{{ Number(target).toString(2).padStart(8, '0') }}</td></tr>
      </table>
    </b-card>

    <b-card id="blockchainPow" class="text-center">
      <Block v-for="(block, index) in getBlockList" :key="index"
             :color="block.color"
             :data="block.data"
             :hash="parseInt(block.hash, 16).toString()"
             :height="block.height"
             :index="index"
             :nonce="block.nonce"
             :nonce-state="block.nonceState"
             :prev-color="block.prevColor"
             :previous-block-hash="block.previousBlockHash"
             v-on:finalizeBlock="finalizeBlock"
             v-on:updateData="updateData"
             v-on:updateNonce="updateNonce"
             v-on:solveNonce="solveNonce" />

    </b-card>
    <br>

    <!-- Add Block Button -->
    <b-input-group prepend="Data">
      <b-form-input v-model="newBlockData"/>
      <b-button @click="addBlock" variant="primary">Add Block</b-button>
    </b-input-group>

    <br>

  </b-collapse>
</template>

<script>
  import Block from '@/components/cards/Block';
  import {sha256d_from_text} from '@/services/utils';

  export default {
    components: {
      Block
    },
    data() {
      return {
        newBlockData: '',
        target: 31,
        targetProbability: (32/256).toFixed(4) * 100,
        targetNumerator: 1,
        targetDenominator: 2,
        encoding: ['hexadecimal', 'decimal', 'binary'],
        blockList: [],
        colors: [
          '#61e294',
          '#7bcdba',
          '#9799ca',
          '#bd93d8',
          '#b47aea'
        ],
      }
    },
    mounted() {
      this.resetList();
    },
    computed: {
      getBlockList() {
        return this.blockList;
      },
      getTargetHex() {
        return this.target.toString(16);
      }
    },
    watch: {
      target() {
        const target = Number(this.target) + 1;
        const max = 256;
        this.targetProbability = ((target / max) * 100).toFixed(2).padStart(5, '0');
        const gcd = this.gcd(target, max);
        this.targetNumerator = target / gcd;
        this.targetDenominator = max / gcd;

        for (let i = 0; i < this.blockList.length; i += 1) {
          this.blockList[i].nonceState = parseInt(this.blockList[i].hash, 16) < this.target;
        }
      }
    },
    methods: {
      async solveNonce(index) {
        while (!this.blockList[index].nonceState) {
          this.blockList[index].nonce += 1;
          await this.finalizeBlock(index);
        }
      },
      gcd(numerator, denominator) {
        let a = numerator;
        let b = denominator;
        // eslint-disable-next-line no-constant-condition
        while(true) {
          if (b === 0) return a;
          a %= b;
          if (a === 0) return b;
          b %= a;
        }
      },
      rotateEncoding() {
        this.encoding.push(this.encoding.shift());
      },
      getPreviousColor() {
        const i = (this.index + 1) % this.colors.length;
        return this.colors[i];
      },
      getColor() {
        const i = this.index % this.colors.length;
        return this.colors[i];
      },

      async addBlock() {
        await this.finalizeBlock(0);
        const prevBlock = this.blockList[0];
        const hash = await this.calcHash(this.newBlockData + prevBlock.previousBlockHash + '0');

        const colorMod = this.blockList.length % this.colors.length;
        const prevColorMod = (this.blockList.length - 1) % this.colors.length;

        this.blockList.unshift({
          data: this.newBlockData,
          previousBlockHash: prevBlock.hash,
          height: prevBlock.height + 1,
          hash,
          nonce: 0,
          nonceState: false,
          color: this.colors[colorMod],
          prevColor: this.colors[prevColorMod],
        })

        this.newBlockData = '';
      },

      async calcHash(data) {
        const hash = await sha256d_from_text(data);
        return hash.substr(0, 2);
      },

      async updateData(newData, index) {
        this.blockList[index].data = newData;
        await this.delayedUpdate(index);
      },

      async updateNonce(nonce, index) {
        this.blockList[index].nonce = nonce;
        await this.delayedUpdate(index);
      },

      async delayedUpdate(index) {
        await this.finalizeBlock(index);
        if (index === 0) {
          return;
        }
        setTimeout(async() => {
          await this.delayedUpdate(index - 1);
        }, 500)
      },

      async finalizeBlock(index) {
        const header = this.blockList[index].data
          + this.blockList[index].previousBlockHash
          + this.blockList[index].nonce;

        const newHash = await this.calcHash(header);
        this.blockList[index].hash = newHash;

        this.blockList[index].nonceState = parseInt(newHash, 16) < this.target;

        if (index > 0) {
          this.blockList[index - 1].previousBlockHash = newHash;
        }
      },

      resetList() {
        this.blockList = [{
          data: 'Alice sent Bob 50₿',
          previousBlockHash: '0000 (Genesis Block)',
          height: 0,
          hash: 'ff',
          nonce: 0,
          nonceState: false,
          color: '#61e294'
        }];
      }

    }

  }
</script>
<style>
  #blockchainPow {
    overflow-y: auto;
    max-height: 40vh;
  }
  #target_table th {
    text-align: center;
  }
  #target_table td {
    text-align: center;
    min-width: 5em;
  }
</style>