<template>
  <div>
<!--    <h4>-->
<!--      Example 2: Proof-of-Work Blockchain-->
<!--    </h4>-->

<!--    <p>-->
<!--      Here we add one new field to the block called a <b>Nonce</b>, which is-->
<!--      shorthand for 'a number used only once'. Also, the block hash is now-->
<!--      required to meet a certain criteria: we will interpret the hash as a-->
<!--      number and only consider it valid if it is less than the <b>target</b>.-->
<!--      This is known as the <b>difficulty</b>.-->
<!--    </p>-->

    <Hex />
    <Target :initial-target="initialTarget" :max="this.targetMax"
            v-on:updateTarget="updateTarget"/>
    <Difficulty :hps-of-this-device="hpsOfThisDevice" :avg-hashes="avgHashes()"
                v-on:calibrate="calibrateHps"/>

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
import Hex from '@/components/cards/Hex.vue';

export default {
  components: {
    BlockCard,
    Difficulty,
    Hex,
    Target,
  },
  data() {
    return {
      blocks: [],
      colors: [
        '#61e294',
        '#7bcdba',
        '#9799ca',
        '#b47aea',
        '#bd93d8',
      ],
      disableAddBlockBtn: true,
      hpsOfThisDevice: 100,
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
    avgHashes() {
      return 1 / (this.target / this.targetMax);
    },
    async calibrateHps() {
      const start = new Date().getTime();
      let elapsed = 0;

      while (elapsed < 3000) {
        this.blocks[0].header.nonce += 1;
        // eslint-disable-next-line no-await-in-loop
        await this.finalizeBlock(0);
        elapsed = new Date().getTime() - start;
      }

      this.hpsOfThisDevice = this.blocks[0].header.nonce / (elapsed / 1000);

      // Reset block.
      this.blocks[0].header.nonce = 0;
      await this.finalizeBlock(0);
    },

    updateTarget(newTarget) {
      this.target = newTarget;

      // Check if all blocks are still under the target.
      for (let i = 0; i < this.blocks.length; i += 1) {
        const hash = parseInt(this.blocks[i].hash.toString().substr(0, 2), 16);
        this.blocks[i].isHashValid = hash < this.target;
        this.blocks[i].stats = [];
      }
    },

    async solveNonce(index) {
      const startTime = new Date().getTime();
      const block = this.blocks[index];
      const startingNonce = block.header.nonce;

      // Allow Solve btn to be clicked even when hash is valid.
      if (block.isHashValid) {
        block.header.nonce += 1;
        await this.finalizeBlock(index);
      }

      while (!block.isHashValid) {
        block.header.nonce += 1;
        // eslint-disable-next-line no-await-in-loop
        await this.finalizeBlock(index);
      }

      await this.delayedUpdate(index);
      block.stats.push({
        tries: block.header.nonce - startingNonce,
        elapsed: new Date().getTime() - startTime,
      });
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
      const block = this.blocks[index];
      await block.calcHash();

      const hash = parseInt(block.hash.substr(0, 2), 16);
      block.isHashValid = hash < this.target;

      if (index > 0) {
        this.blocks[index - 1].header.prevHash = block.hash;
      }
      this.resetAddBlockBtn();
    },
    resetAddBlockBtn() {
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
