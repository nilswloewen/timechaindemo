<template>
  <b-collapse id="collapse_block_chain" visible>
    <b-card no-body>
      <b-card-header v-b-toggle.collapse_block_chain>
        <b-icon-chevron-compact-up /> Blockchain
      </b-card-header>

      <b-card-body>
        A data structure that links sets of data together through hashes.

        <Block v-for="(block, index) in getBlockList" :key="index"
               :data="block.data"
               :previous-block-hash="block.previousBlockHash"
               :height="block.height"
               :hash="block.hash"
               :index="index"
               v-on:finalizeBlock="finalizeBlock"
               v-on:updateData="updateData" />

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
        blockList: [{
          data: 'Alice sent Bob $50',
          previousBlockHash: '0000',
          height: 0,
          hash: '????'
        }],
      }
    },
    computed: {
      getBlockList() {
        return this.blockList;
      }
    },
    methods: {
      async addBlock() {
        await this.finalizeBlock(0);
        const prevBlock = this.blockList[0];
        const hash = await this.calcHash(this.newBlockData + prevBlock.previousBlockHash);

        this.blockList.unshift({
          data: this.newBlockData,
          previousBlockHash: prevBlock.hash,
          height: prevBlock.height + 1,
          hash
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
      }
    }

  }
</script>