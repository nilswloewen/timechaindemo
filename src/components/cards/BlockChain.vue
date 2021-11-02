<template>
  <b-collapse id="collapse_block_chain" visible>
    <b-card no-body>
      <b-card-header v-b-toggle.collapse_block_chain>
        <b-icon-chevron-compact-up /> Blockchain
      </b-card-header>

      <b-card-body>
        A data structure that links sets of data together through hashes.

        <b-button @click="addBlock">Add Block</b-button>
        <Block v-for="block in this.blockList" :key="block.data"
               :data="block.data"
               :previous-block-hash="block.previousBlockHash"
               :height="block.height"
               :id="block.id"/>

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
        blockList: [{
          data: 'Alice sent Bob $50',
          previousBlockHash: '0000',
          height: 0,
          id: 'Hey',
        }],
      }
    },
    methods: {
      addBlock() {
        const prevBlock = this.blockList[this.blockList.length - 1];
        const id= this.calcId('00');

        this.blockList.push({
          data: '',
          previousBlockHash: prevBlock.id,
          height: prevBlock.height + 1,
          id
        })
      },

      async calcId(data) {
        return await sha256d_from_text(data);
      }
    }
  }
</script>