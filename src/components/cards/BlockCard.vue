<template>
  <div class="text-center">

    <!-- Chain-link icon -->
    <b-iconstack font-scale="3" v-if="index > 0" class="mb-4">
      <b-icon-link stacked rotate="90" :style="getLinkColor" />
      <b-icon stacked icon="slash" variant="danger" v-if="!isHashValid"></b-icon>
    </b-iconstack>

    <b-card no-body class="text-left">
      <!-- Height -->
      <b-card-header>
        Block #
        <template v-if="showBlockHeightInput">
          <b-input-group size="sm">
            <b-form-input @change="onBlockHeightChange" :value="block.height"
                          :max="blockHeightMax" :min="0" type="number" size="sm"/>
            <b-button @click="getLatestBlock" variant="primary" size="sm">Latest</b-button>
          </b-input-group>
        </template>
        <template v-else>{{ block.height }}</template>
        <b-button class="float-right">
          <b-icon-bar-chart-steps/>
        </b-button>
      </b-card-header>

      <!--Hash-->
      <b-list-group-item class="list-field">Hash (ID) </b-list-group-item>
      <b-list-group-item class="list-value">
        <b-form-input title="Hash" size="sm" :style="getColor"
                      :value="getHash" :disabled="true" :state="isHashValid"/>
      </b-list-group-item>

      <template v-if="showData">
        <!--Data-->
        <b-list-group-item class="list-field">Data</b-list-group-item>
        <b-list-group-item class="list-value">
          <b-form-input @keyup="onDataChange" :value="block.header.data" size="sm"/>
        </b-list-group-item>
      </template>

      <template v-if="showReal">
        <!--Version-->
        <b-list-group-item class="list-field">Version</b-list-group-item>
        <b-list-group-item class="list-value">
          {{ block.header.version.toString(16).padStart(8, '0') }}
        </b-list-group-item>

        <!--Bits-->
        <b-list-group-item class="list-field">Bits</b-list-group-item>
        <b-list-group-item class="list-value">
          {{ block.header.bits.toString(16).padStart(8, '0')}}
        </b-list-group-item>

        <!--Merkle Root-->
        <b-list-group-item class="list-field">Merkle Root</b-list-group-item>
        <b-list-group-item class="list-value">{{ block.header.merkleRoot }}</b-list-group-item>
      </template>

      <template v-if="showNonce">
        <!--Nonce-->
        <b-list-group-item class="list-field">Nonce</b-list-group-item>
        <b-list-group-item class="list-value">
          <b-input-group>
            <b-form-input class="nonce_input" @change="onNonceChange"
                          :value="block.header.nonce" :state="isHashValid"
                          type="number" :min="0" :max="4294967295" size="sm"/>
            <b-button-group>
              <b-button size="sm" @click="incrementNonce" :disabled="isHashValid">
                + 1
              </b-button>
              <b-button size="sm" @click="solveNonce" variant="warning">Solve</b-button>
            </b-button-group>
          </b-input-group>
        </b-list-group-item>
      </template>

      <!--Time-->
      <b-list-group-item class="list-field">Timestamp</b-list-group-item>
      <b-list-group-item class="list-value">{{ getTime }}</b-list-group-item>

      <!--Previous Hash-->
      <b-list-group-item class="list-field">Previous Hash</b-list-group-item>
      <b-list-group-item class="list-value">
        <b-form-input title="Hash" :style="getPrevColor" size="sm" :disabled="true"
                      :value="getPrevHash" :state="isHashValid"/>
      </b-list-group-item>

    </b-card>
  </div>
</template>

<script>
import Block from '@/services/block/Block';

export default {
  props: {
    block: Block,
    hexDigits: {
      type: Number,
      required: false,
    },
    index: {
      type: Number,
      required: false,
    },
    showBlockHeightInput: Boolean,
    showData: Boolean,
    showReal: Boolean,
    showNonce: Boolean,
  },

  data() {
    return {
      blockHeightMax: 706894,
    };
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
      return this.block.hash.substr(0, this.hexDigits);
    },
    getPrevHash() {
      return this.block.header.prevHash.substr(0, this.hexDigits);
    },
    getTime() {
      const date = new Date(this.block.header.timestamp * 1000);
      return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'long' }).format(date);
    },
    isHashValid() {
      if (!this.showNonce) return true;
      return this.block.isHashValid;
    },
  },

  methods: {
    solveNonce() {
      this.$emit('solve-nonce', this.index);
    },
    incrementNonce() {
      this.$emit('update-nonce', this.block.header.nonce + 1, this.index);
    },
    onDataChange(newData) {
      this.$emit('update-data', newData, this.index);
    },
    onNonceChange(nonce) {
      this.$emit('update-nonce', Number(nonce), this.index);
    },
    async finalizeBlock() {
      this.$emit('finalize-block', this.index);
    },
    getLatestBlock() {
      this.$emit('update-block-height-latest');
    },
    onBlockHeightChange(newHeight) {
      this.$emit('update-block-height', newHeight);
    },
  },
};
</script>
