<template>
  <b-card id="raw_block_wrapper" title="Block Header">
    <b-list-group id="block_height_and_id">
      <!-- Height -->
      <b-list-group-item class="list-field border-bottom-0"> Height </b-list-group-item>
      <b-list-group-item class="list-value">
        <b-form-input @change="onBlockHeightChange" id="block_height_input" type="number" :value="this.block.height"/>
      </b-list-group-item>

      <!-- Id -->
      <b-list-group-item class="list-field border-bottom-0"> Id </b-list-group-item>
      <b-list-group-item class="list-value"> {{ this.block.id }} </b-list-group-item>
    </b-list-group>

    <b-list-group id="block_serialized">
      <template v-for="item in this.blockTable">
        <b-list-group-item :key="item.field" class="list-field border-bottom-0"> {{ item.field }} </b-list-group-item>
        <b-list-group-item :key="item.value" class="list-value"> {{ item.value }} </b-list-group-item>
      </template>
    </b-list-group>

  </b-card>
</template>

<script>
  import Mempool from '../services/Mempool.js';

  export default {
    data() {
      return {
        blockTable: [
        ],
        mempool: new Mempool(),
        blockHeight: Number,
        block: Object
      };
    },

    async mounted() {
      this.blockHeight = await this.mempool.getHeightOfLatestBlock();
    },

    watch: {
      async blockHeight() {
        const id = await this.mempool.getBlockIdFromHeight(this.blockHeight)
        const block = await this.mempool.getBlockById(id);
        this.block = block;

        const date = new Date(block.timestamp * 1000);
        const time = new Intl.DateTimeFormat('en-US', {dateStyle: 'medium', timeStyle: 'long'}).format(date);

        this.blockTable = [
          {field: "Version", value: block.version},
          {field: "Previous Block", value: block.previousblockhash || '0'.padStart(64, '0')},
          {field: "Merkle Root", value: block.merkle_root},
          {field: "Time", value: time},
          {field: "Bits", value: block.bits},
          {field: "Nonce", value: block.nonce.toLocaleString('en-US')},
        ];

        // $block = block;
        this.$emit('updateBlock', this.block);
      }
    },
    methods: {
      onBlockHeightChange(value) {
        this.blockHeight = value;
      }
    }

  };
</script>

<style>
  #block_height_and_id {
    margin-bottom: 1em;
  }
  #block_height_input {
    padding-top: 0.1em !important;
    padding-bottom: 0.1em !important;
    padding-left: 0.4em !important;
  }
  .list-field {
    padding-bottom: 0 !important;
    font-weight: lighter;
    font-size: .8em;
  }
</style>
