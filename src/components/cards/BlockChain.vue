<template>
  <b-collapse id="collapse_block_chain" visible>
    <b-card no-body>
      <b-card-header v-b-toggle.collapse_block_chain @click="resetList">
        <b-icon-chevron-compact-up /> Blockchain
      </b-card-header>

      <b-card-body>
        A data structure that links sets of data together through hashes.

        <div id="blockchain" class="text-center">
          <Block v-for="(block, index) in getBlockList" :key="index"
                 :data="block.data"
                 :previous-block-hash="block.previousBlockHash"
                 :height="block.height"
                 :hash="block.hash"
                 :index="index"
                 :color="block.color"
                 :prev-color="block.prevColor"
                 v-on:finalizeBlock="finalizeBlock"
                 v-on:updateData="updateData" />
        </div>
        <br>

        <b-input-group size="sm"  prepend="Data">
          <b-form-input v-model="newBlockData"/>
          <b-button @click="addBlock" variant="primary">Add Block</b-button>
        </b-input-group>

      </b-card-body>

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
        return hash.substr(0, 4);
      },

      async updateData(newData, index) {
        this.blockList[index].data = newData;

        for (let i = index; i >= 0; i -= 1) {
          await this.finalizeBlock(i);
        }
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
          data: 'Alice sent Bob $50',
          previousBlockHash: '0000 (Genesis Block)',
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