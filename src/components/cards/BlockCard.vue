<template>
  <div>
    <!-- Chain-link icon -->
    <b-iconstack font-scale="3" v-if="index > 0">
      <b-icon-link stacked rotate="90" :style="getLinkColor" />
      <b-icon stacked icon="slash" variant="danger" v-if="!block.isHashValid"></b-icon>
    </b-iconstack>

    <b-card no-body class="block">
      <b-card-header>
        <b-button title="Block Height" style="float: left;" :disabled="true" size="sm">
          Block #{{ this.block.height }}
        </b-button>
        <b-button-group style="line-height: 2em;">
          <b-form-input id="block_hash" title="Hash" :style="getColor" class="p-1 border-0 fw-bold"
                        :value="getHash" :disabled="true" :state="block.isHashValid"/>
        </b-button-group>
      </b-card-header>

      <!-- Data -->
      <b-list-group-item class="list-field"> Data </b-list-group-item>
      <b-list-group-item class="list-value">
        <b-form-input @change="onDataChange" :value="block.header.data" class="text-center"/>
      </b-list-group-item>

      <!-- Nonce -->
      <b-list-group-item class="list-field"> Nonce </b-list-group-item>
      <b-list-group-item class="list-value">
        <b-input-group class="justify-content-center p-1">
          <b-button-group>
            <b-form-input id="nonce" class="text-center" @change="onNonceChange"
                          :value="block.header.nonce" :state="block.isHashValid"
                          type="number"/>
            <b-button @click="incrementNonce" :disabled="block.isHashValid">+ 1</b-button>
            <b-button @click="solveNonce" variant="warning">Solve</b-button>
          </b-button-group>
          <div class="p-2" v-if="typeof block.tries !== 'undefined'">
            Tries: {{getTries()}}, Avg: {{avgTries()}}
          </div>
        </b-input-group>
      </b-list-group-item>

      <!-- Previous block hash -->
      <b-list-group-item class="list-field"> Previous block hash </b-list-group-item>
      <b-list-group-item class="list-value">
        <span :style="getPrevColor" class="rounded p-1">
          <b>{{ getPrevHash }}</b>
        </span>
      </b-list-group-item>

    </b-card>
  </div>
</template>

<script>
import Block from '@/services/block/DemoBlock';

export default {
  props: {
    block: Block,
    index: Number,
  },

  computed: {
    getColor() {
      return `background-color: ${this.block.color};`;
    },
    getPrevColor() {
      return `background-color: ${this.block.prevColor};`;
    },
    getLinkColor() {
      return `color: ${this.block.color};`;
    },
    getHash() {
      const hex = this.block.hash.substr(0, 2);
      const decimal = parseInt(hex, 16);
      return `Hex: ${hex} | Decimal: ${decimal}`;
    },
    getPrevHash() {
      return this.block.header.prevHash.substr(0, 2);
    },
  },

  methods: {
    getTries() {
      return this.block.tries[this.block.tries.length - 1];
    },
    avgTries() {
      if (this.block.tries.length > 0) {
        const { length } = this.block.tries;
        const sum = this.block.tries.reduce((a, b) => a + b, 0);
        return (sum / length).toFixed(1);
      }
      return '?';
    },
    solveNonce() {
      this.$emit('solveNonce', this.index);
    },
    incrementNonce() {
      this.$emit('updateNonce', this.block.header.nonce + 1, this.index);
    },
    onDataChange(newData) {
      this.$emit('updateData', newData, this.index);
    },
    onNonceChange(nonce) {
      this.$emit('updateNonce', Number(nonce), this.index);
    },
    async finalizeBlock() {
      this.$emit('finalizeBlock', this.index);
    },
  },
};
</script>

<style>
  .block {
    margin-bottom: 0;
    margin-right: 1em;
  }
  .block .card-header button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: black;
  }
  #block_hash {
    /*max-width: 60px;*/
  }
  #nonce {
    max-width: 120px;
  }
</style>
