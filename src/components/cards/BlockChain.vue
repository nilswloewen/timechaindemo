<template>
  <b-collapse id="collapse_blockchain" hidden>
    <h4>
      Example 1: Non-Proof-of-Work Blockchain
    </h4>

    <p>
      Here is a simplified example of a blockchain. The hash of the block is calculated from the data and the previous block hash. Try changing the data and watch how the block hash changes.
    </p>

    <b-card id="blockchain" class="text-center">
      <Block v-for="(block, index) in getBlockList" :key="index"
             :color="block.color"
             :data="block.data"
             :hash="block.hash"
             :height="block.height"
             :index="index"
             :prev-color="block.prevColor"
             :previous-block-hash="block.previousBlockHash"
             v-on:finalizeBlock="finalizeBlock"
             v-on:updateData="updateData" />
    </b-card>
    <br>

    <!-- Add Block Button -->
    <b-input-group size="sm"  prepend="Data">
      <b-form-input v-model="newBlockData"/>
      <b-button @click="addBlock" variant="primary">Add Block</b-button>
    </b-input-group>

    <br>
    <p>
      In this example any block hash is considered valid. Because the cost of calculating a single hash is negligible, and an attacker could change data from the past and recalculate the following blocks instantly.
    </p>

    <b-card>
      <h5>Height</h5>
      Because each new block embeds the hash of the previous block, the new block is thought of as being added to the tip of the chain. This is known as the block height.
    </b-card>
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

    },
    methods: {
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
        const hash = await this.calcHash(this.newBlockData + prevBlock.previousBlockHash);

        const colorMod = this.blockList.length % this.colors.length;
        const prevColorMod = (this.blockList.length - 1) % this.colors.length;

        this.blockList.unshift({
          data: this.newBlockData,
          previousBlockHash: prevBlock.hash,
          height: prevBlock.height + 1,
          hash,
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

        await this.delayUpdate(index);
      },

      async delayUpdate(index) {
        await this.finalizeBlock(index);
        if (index === 0) {
          return;
        }
        setTimeout(async() => {
          await this.delayUpdate(index - 1);
        }, 500)
      },

      async finalizeBlock(index) {
        const data = this.blockList[index].data + this.blockList[index].previousBlockHash;
        const newHash = await this.calcHash(data);
        this.blockList[index].hash = newHash;

        if (index > 0) {
          this.blockList[index - 1].previousBlockHash = newHash;
        }
      },
      resetList() {
        this.blockList = [{
          data: 'Alice sent Bob 50₿',
          previousBlockHash: '00 (Genesis Block)',
          height: 0,
          hash: '????',
          color: '#61e294'
        }];
      }

    }

  }
</script>
<style>
  #blockchain {
    overflow-y: auto;
    max-height: 40vh;
  }
</style>