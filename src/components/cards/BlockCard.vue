<template>
<div :ref="`block_${block.height}`">
  <!-- Chain-link icon -->
  <b-iconstack font-scale="3" v-if="index > 0" class="mb-4">
    <b-icon-link stacked rotate="90" :style="getLinkColor"/>
    <b-icon stacked icon="slash" variant="danger" v-if="!isHashValid"></b-icon>
  </b-iconstack>

  <b-card no-body class="block" :style="`box-shadow: -1px 2px 5px 0 ${block.color};`">
    <!--Hash-->
    <b-list-group class="header update_box_shadow" :style="`background-color: ${block.color};`" :key="getHash">
      <b-list-group-item class="list-field">
          <span class="block_hash">Block Hash
            <template v-if="block.height === 0">(Genesis Block)</template>
          </span>
        <span class="block_number">#{{ block.height }}</span>
      </b-list-group-item>
      <b-list-group-item class="list-value border-0">
        {{ getHash }}
      </b-list-group-item>
    </b-list-group>

    <template v-if="showBlockHeightInput">
      <b-list-group-item class="list-field">Height</b-list-group-item>
      <b-list-group-item class="list-value">
        <b-input-group size="sm">
          <b-form-input @change="onBlockHeightChange" :value="block.height"
                        :max="blockHeightMax" :min="0" type="number" size="sm"/>
          <b-button @click="$emit('update-block-height-latest')" variant="primary" size="sm"
                    style="border-top-left-radius: 0; border-bottom-left-radius: 0"
          >Latest</b-button>
        </b-input-group>
      </b-list-group-item>
    </template>

    <!--Data-->
    <template v-if="showData">
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
      <b-list-group-item class="list-field">Target (Bits)</b-list-group-item>
      <b-list-group-item class="list-value">
        {{ block.header.bits.toString(16).padStart(8, '0') }}
      </b-list-group-item>

      <!--Merkle Root-->
      <b-list-group-item class="list-field">Transactions (Merkle Root)</b-list-group-item>
      <b-list-group-item class="list-value merkle_root">{{ block.header.merkleRoot }}</b-list-group-item>

      <!--Time-->
      <b-list-group-item class="list-field">Timestamp</b-list-group-item>
      <b-list-group-item class="list-value">{{ getTime }}</b-list-group-item>
    </template>

    <!--Previous Hash-->
    <b-list-group-item class="list-field">Previous Hash</b-list-group-item>
    <b-list-group-item class="list-value">
      <div class="rounded prev_block update_box_shadow" :style="getPrevColor"
           :key="block.header.prevHash">
        {{ block.header.prevHash[localEncoding] }}
      </div>
    </b-list-group-item>

    <!--Nonce-->
    <template v-if="showNonce">
      <div style="width: 100%;">
        <b-list-group class="float-left">
          <b-list-group-item class="list-field">Nonce</b-list-group-item>
          <b-list-group-item class="list-value">
            <template v-if="maskNonce && !isHashValid"> ???????? </template>
            <template v-else> {{ block.header.nonce }} </template>
          </b-list-group-item>
        </b-list-group>

        <!-- Mine this block Button -->
        <template v-if="!isHashValid">
          <b-button @click="$emit('mine-this-block', index)" title="Mine this Block"
                    size="sm" variant="danger" class="float-right">
            <b-icon-hammer size="sm" animation="fade"/>
          </b-button>
        </template>

      </div>
    </template>
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
      required: false
    },
    index: {
      type: Number,
      required: false
    },
    showBlockHeightInput: Boolean,
    showData: Boolean,
    showReal: Boolean,
    showNonce: Boolean,
    localEncoding: String,
    maskNonce: Boolean,
  },

  data() {
    return {
      blockHeightMax: 706894
    };
  },

  computed: {
    getColor() {
      return `background-color: ${ this.block.color };`;
    },
    getPrevColor() {
      if (this.block.height === 0 || this.showReal) {
        return 'color: white;';
      }
      return `background-color: ${ this.block.prevColor };`;
    },
    getLinkColor() {
      return `color: ${ this.block.color };`;
    },
    getTime() {
      const date = new Date(this.block.header.timestamp * 1000);
      return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'long' }).format(date);
    },
    isHashValid() {
      if (!this.showNonce) return true;
      return this.block.isHashValid;
    },
    getHash() {
      return this.block.hash[this.localEncoding];
    }
  },

  methods: {
    onDataChange(newData) {
      this.$emit('update-data', newData, this.index);
    },
    onBlockHeightChange(newHeight) {
      this.$emit('update-block-height', newHeight);
    }
  }
};
</script>

<style>
.merkle_root {
  font-size: 0.875rem;
}

.prev_block {
  text-shadow: none;
  padding: 0 2px;
  color: black;
}

.header {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  text-shadow: none;
  color: black;
  font-size: 1rem;
}

.block_hash {
  float: left;
}

.block_number {
  float: right;
}

.update_box_shadow {
  animation: box_shadow 2s;
}

@keyframes box_shadow {
  from {
    box-shadow: 0 0 4px 4px white;
  }
  to {
    box-shadow: none;
  }
}
</style>
