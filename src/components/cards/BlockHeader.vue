<template>
  <b-collapse id="collapse_block_header">
    <b-card no-body>

      <b-card-header v-b-toggle.collapse_block_header>
        <b-icon-chevron-compact-up /> Block Header
      </b-card-header>

        <!-- Height -->
        <b-list-group-item class="list-field border-bottom-0"> Height </b-list-group-item>
        <b-list-group-item class="list-value">
          <b-button-toolbar>
            <b-button-group>
              <b-form-input @change="onBlockHeightChange" :value="this.block.height"
                            :max="this.blockHeightMax" :min="0" type="number" />
              <b-button @click="onLatest" variant="primary">Latest</b-button>
            </b-button-group>
          </b-button-toolbar>
        </b-list-group-item>

        <!-- Id -->
        <b-list-group-item class="list-field border-bottom-0"> Id </b-list-group-item>
        <b-list-group-item class="list-value"> {{ this.block.id }} </b-list-group-item>

        <!-- Version, Previous Hash, Merkle Root, Time, Bits -->
        <template v-for="item in this.blockList">
          <b-list-group-item :key="item.field" class="list-field border-bottom-0">
            {{ item.field }}
          </b-list-group-item>
          <b-list-group-item :key="item.value" class="list-value"> {{ item.value }} </b-list-group-item>
        </template>

        <!-- Id -->
        <b-list-group-item class="list-field border-bottom-0"> Bits - a shorthand recording of the current TARGET </b-list-group-item>
        <b-list-group-item class="list-value"> {{ this.targetBits }} </b-list-group-item>

    </b-card>
  </b-collapse>

</template>

<script>
  import Mempool from '@/services/Mempool.js';
  import {intToHex} from '@/services/utils';

  export default {
    mounted() {
      this.setBlockList();
      this.$emit('updateBlock', this.block);
    },

    data() {
      return {
        mempool: new Mempool(),
        // Genesis block as default.
        block:{
          bits: 486604799,
          difficulty: 1,
          height: 0,
          id: "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
          merkle_root: "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
          nonce: 2083236893,
          previousBlockHash: ''.padStart(64, '0'),
          timestamp: 1231006505,
          version: 1,
        },
        targetBits: String,
        blockHeightMax: 706894,
        blockList: Array,
      }
    },

    methods: {
      async getBlock(height) {
        const id = await this.mempool.getBlockIdFromHeight(height)
        this.block = await this.mempool.getBlockById(id);

        this.setBlockList();
        this.$emit('updateBlock', this.block);
      },

      async onBlockHeightChange(height) {
        await this.getBlock(height);
      },

      async onLatest() {
        const height = await this.mempool.getHeightOfLatestBlock();
        this.blockHeightMax = height;
        await this.getBlock(height);
      },

      setBlockList() {
        const date = new Date(this.block.timestamp * 1000);
        const time = new Intl.DateTimeFormat('en-US', {dateStyle: 'medium', timeStyle: 'long'}).format(date);
        this.targetBits = intToHex(this.block.bits);

        this.blockList = [
          {field: "Version - protocol version ", value: intToHex(this.block.version)},
          {field: "Previous Block Hash - ID of previous block", value: this.block.previousBlockHash},
          {field: "Merkle Root - a record of transactions included in this block", value: this.block.merkle_root},
          {field: "Time", value: time},
        ];
      },
    }
  }
</script>

<style>
  .list-field {
    padding-bottom: 0 !important;
    font-weight: lighter;
    font-size: .8em;
  }
  .list-value {
    padding-top: 0 !important;
  }
</style>
