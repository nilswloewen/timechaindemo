<template>
  <div>
    <h4>
      Example 2: Proof-of-Work Blockchain
    </h4>

    <p>
      Here we add one new field to the block called a <b>Nonce</b>, which is
      shorthand for 'a number used only once'. Also, the block hash is now
      required to meet a certain criteria: we will interpret the hash as a
      number and only consider it valid if it is less than the <b>target</b>.
      This is known as the <b>difficulty</b>.
    </p>

    <Target :initial-target="initialTarget" :max="this.targetMax"
            v-on:updateTarget="updateTarget"/>
    <Difficulty :hps-of-this-device="hpsOfThisDevice" v-on:calibrate="calibrateHps"/>

    <br>

    <!-- Add block Button -->
    <b-input-group prepend="Data">
      <b-form-input v-model="newBlockData" :disabled="disableAddBlockBtn"/>
      <b-button @click="addBlock" variant="primary" :disabled="disableAddBlockBtn">
        Add Block
      </b-button>
    </b-input-group>

    <div id="blockchainPow" class="text-center">
      <BlockCard v-for="(block, index) in this.blocks" :key="index"
                 :block="block"
                 :index="index"
                 v-on:finalizeBlock="finalizeBlock"
                 v-on:updateData="updateData"
                 v-on:updateNonce="updateNonce"
                 v-on:solveNonce="solveNonce" />
    </div>
  </div>
</template>

<script>
import Block from '@/services/block/DemoBlock';
import BlockHeader from '@/services/block/DemoBlockHeader';
import BlockCard from '@/components/cards/BlockCard.vue';
import Difficulty from '@/components/controls/Difficulty.vue';
import Target from '@/components/controls/Target.vue';

export default {
  components: {
    BlockCard,
    Difficulty,
    Target,
  },
  data() {
    return {
      hpsOfThisDevice: 0,
      blocks: [],
      colors: [
        '#61e294',
        '#7bcdba',
        '#9799ca',
        '#bd93d8',
        '#b47aea',
      ],
      disableAddBlockBtn: true,
      initialTarget: 32,
      newBlockData: '',
      target: 32,
      targetMax: 256,
    };
  },

  async mounted() {
    await this.resetBlocks();
  },

  methods: {
    async calibrateHps() {
      const start = new Date().getTime();
      let current = 0;
      let elapsed = 0;

      while (elapsed < 3000) {
        current = new Date().getTime();
        elapsed = current - start;

        this.blocks[0].header.nonce += 1;
        // eslint-disable-next-line no-await-in-loop
        await this.finalizeBlock(0);
      }

      this.hpsOfThisDevice = (this.blocks[0].header.nonce / elapsed) * 1000;

      // Reset block.
      this.blocks[0].header.nonce = 0;
      await this.finalizeBlock(0);
    },

    updateTarget(newTarget) {
      this.target = newTarget;

      // Check if all blocks are still under the target.
      for (let i = 0; i < this.blocks.length; i += 1) {
        this.blocks[i].isHashValid = parseInt(this.blocks[i].hash, 16) < this.target;
      }
    },

    async solveNonce(index) {
      let tries = 0;

      // Allow Solve btn to be clicked even when hash is valid.
      if (this.blocks[index].isHashValid) {
        tries += 1;
        this.blocks[index].header.nonce += 1;
        await this.finalizeBlock(index);
      }

      while (!this.blocks[index].isHashValid) {
        tries += 1;
        this.blocks[index].header.nonce += 1;
        // eslint-disable-next-line no-await-in-loop
        await this.finalizeBlock(index);
      }

      this.blocks[index].tries.push(tries);
      await this.delayedUpdate(index);
    },

    getColor() {
      const i = this.index % this.colors.length;
      return this.colors[i];
    },

    async addBlock() {
      const header = new BlockHeader(this.newBlockData, 0, this.blocks[0].hash);
      const block = new Block('', header, 0,
        this.colors[this.blocks.length % this.colors.length],
        this.colors[(this.blocks.length - 1) % this.colors.length]);
      await block.calcHash();

      this.blocks.unshift(block);

      // Reset 'Add Block' input.
      this.disableAddBlockBtn = true;
      this.newBlockData = '';
    },

    async updateData(newData, index) {
      this.blocks[index].header.data = newData;
      await this.delayedUpdate(index);
    },

    async updateNonce(nonce, index) {
      this.blocks[index].header.nonce = nonce;
      await this.delayedUpdate(index);
    },

    async delayedUpdate(index) {
      await this.finalizeBlock(index);
      if (index === 0) {
        return;
      }
      setTimeout(async () => {
        await this.delayedUpdate(index - 1);
      }, 500);
    },

    async finalizeBlock(index) {
      await this.blocks[index].calcHash();
      const hash = parseInt(this.blocks[index].hash.substr(0, 2), 16);
      this.blocks[index].isHashValid = hash < this.target;

      if (index > 0) {
        this.blocks[index - 1].header.prevHash = this.blocks[index].hash;
      }

      this.disableAddBlockBtn = false;
      this.blocks.forEach((block) => {
        if (!block.isHashValid) {
          this.disableAddBlockBtn = true;
        }
      });
    },

    async resetBlocks() {
      const block = new Block('', BlockHeader.genesis, 0, this.colors[0], 'inherit');
      await block.calcHash();
      this.blocks = [block];
    },
  },
};
</script>

<style>
  #blockchainPow {
    overflow-y: auto;
    max-height: 40vh;
    background-color: ghostwhite;
  }
  #target_table th {
    text-align: center;
  }
  #target_table td {
    text-align: center;
    min-width: 5em;
  }
</style>
