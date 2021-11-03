<template>
  <b-collapse id="collapse_blockchain_pow" visible>
    <h4>
      Example 2: Proof-of-Work Blockchain
    </h4>

    <p>
      Here we add one new field to the block called a <b>Nonce</b>, which is shorthand for 'a number used only once'. Also, the block hash is now required to meet a certain criteria: we will interpret the hash as a number and only consider it valid if it is less than the <b>target</b>. This is known as the <b>difficulty</b>.
    </p>

    <Target :initial-target="31" :target-max="this.targetMax" v-on:updateTarget="updateTarget"/>

    <b-card id="blockchainPow" class="text-center">
      <Block v-for="(block, index) in this.blockList" :key="index"
             :color="block.color"
             :data="block.data"
             :hash="block.hash"
             :height="block.height"
             :index="index"
             :is-hash-valid="block.isHashValid"
             :nonce="block.nonce"
             :prev-color="block.prevColor"
             :previous-block-hash="block.previousBlockHash"
             :tries="block.tries"
             v-on:finalizeBlock="finalizeBlock"
             v-on:updateData="updateData"
             v-on:updateNonce="updateNonce"
             v-on:solveNonce="solveNonce" />

    </b-card>
    <br>

    <!-- Add Block Button -->
    <b-input-group prepend="Data">
      <b-form-input v-model="newBlockData"/>
      <b-button @click="addBlock" variant="primary" :disabled="disableAddBlock">Add Block</b-button>
    </b-input-group>

    <br>

  </b-collapse>
</template>

<script>
  import Block from '@/components/cards/Block';
  import {sha256d_from_text} from '@/services/utils';
  import Target from "@/components/controls/Target";

  export default {
    components: {
      Block,
      Target
    },
    data() {
      return {
        newBlockData: '',
        target: Number,
        initialTarget: 32,
        targetMax: 256,
        disableAddBlock: true,
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

    methods: {
      updateTarget(newTarget) {
        this.target = newTarget;

        // Check if all blocks are still under the target.
        for (let i = 0; i < this.blockList.length; i += 1) {
          this.blockList[i].isHashValid = parseInt(this.blockList[i].hash, 16) < this.target;
        }
      },
      async solveNonce(index) {
        if (this.blockList[index].isHashValid) {
          this.blockList[index].nonce += 1;
          await this.finalizeBlock(index);
        }
        this.blockList[index].tries = 1;
        while (!this.blockList[index].isHashValid) {
          this.blockList[index].tries += 1;
          this.blockList[index].nonce += 1;
          await this.finalizeBlock(index);
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
          isHashValid: false,
          color: this.colors[colorMod],
          prevColor: this.colors[prevColorMod],
        })

        this.newBlockData = '';
        this.disableAddBlock = true;
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

        console.log(parseInt(newHash, 16));
        console.log(this.target);
        this.blockList[index].isHashValid = parseInt(newHash, 16) < this.target;

        if (index > 0) {
          this.blockList[index - 1].previousBlockHash = newHash;
        }

        this.disableAddBlock = false;
        this.blockList.map((block) => {
          if (!block.isHashValid) {
            this.disableAddBlock = true;
          }
        });
      },

      resetList() {
        this.blockList = [{
          data: 'Alice sent Bob 5₿',
          previousBlockHash: '0000 (Genesis Block)',
          height: 0,
          hash: '7c',
          nonce: 0,
          isHashValid: false,
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