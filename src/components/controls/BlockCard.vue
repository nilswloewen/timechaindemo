<template>
<div :ref="`block_${block.height}`">
  <!-- Chain-link icon -->
  <b-iconstack font-scale="3" v-if="index > 0" class="mb-4">
    <b-icon-link stacked rotate="90" :style="getLinkColor"/>
    <b-icon stacked icon="slash" variant="danger" v-if="!isHashValid"></b-icon>
  </b-iconstack>

  <b-card no-body class="block_card" :style="`box-shadow: -1px 2px 5px 0 ${block.color};`">

    <!--Hash-->
    <b-card-header class="block_header update_box_shadow" :style="`background-color: ${block.color};`" :key="getHash">
      <div class="block_label">
        Block #{{ block.height.toLocaleString() }} | Hash <span v-if="block.height === 0"> (Genesis Block)</span>

<!--        <b-button class="rotate_encoding_btn float-right" @click="$emit('rotate-encoding')" size="sm">-->
<!--          <b-icon-vector-pen/>-->
<!--        </b-button>-->
      </div>

      <div class="hash_value">
        <template v-if="isHashValid">
          {{ getHash }}
        </template>

        <template v-else>
            <span class="invalid_hash" @click="$emit('mine-this-block', index)" role="button">
              {{ getHash }}
            </span>
        </template>
      </div>
    </b-card-header>

    <template v-if="showBlockHeightInput">
      <div class="list label">Height</div>
      <div class="list value">
        <b-input-group size="sm">
          <b-form-input @change="onBlockHeightChange" :value="block.height"
                        :max="blockHeightMax" :min="0" type="number" size="sm"/>
          <b-button @click="$emit('update-block-height-latest')" variant="primary" size="sm"
                    style="border-top-left-radius: 0; border-bottom-left-radius: 0"
          >Latest</b-button>
        </b-input-group>
      </div>
    </template>

    <!--Data-->
    <template v-if="showData">
      <div class="list label">Data</div>
      <div class="list value">
        <b-form-input @keyup="onDataChange" :value="block.header.data" size="sm"/>
      </div>
    </template>

    <template v-if="showReal">
      <!--Version-->
      <div class="list label">Version</div>
      <div class="list value">
        {{ block.header.version.toString(16).padStart(8, '0') }}
      </div>

      <!--Bits-->
      <div class="list label">Target (Bits)</div>
      <div class="list value">
        {{ block.header.bits.toString(16).padStart(8, '0') }}
      </div>

      <!--Merkle Root-->
      <div class="list label">Transactions (Merkle Root)</div>
      <div class="list value merkle_root">{{ block.header.merkleRoot }}</div>

      <!--Time-->
      <div class="list label">Timestamp</div>
      <div class="list value">{{ getTime }}</div>
    </template>

    <!--Previous Hash-->
    <div class="list label">Previous Hash</div>
    <div class="list value">
      <div class="rounded prev_block update_box_shadow" :style="getPrevColor"
           :key="block.header.prevHash">
        {{ block.header.prevHash[localEncoding] }}
      </div>
    </div>

    <!--Nonce-->
    <template v-if="showNonce">
      <div style="width: 100%;">
        <b-list-group class="float-left">
          <div class="list label">Nonce</div>
          <div class="list value">
            <template v-if="maskNonce && !isHashValid"> ???????? </template>
            <template v-else> {{ block.header.nonce }} </template>
          </div>
        </b-list-group>
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
.prev_block {
  text-shadow: none;
  padding: 0 2px;
  color: black;
}
.invalid_hash {
  border-radius: 4px;
  background-color: #b72919;
  color: white;
}

.card-header.block_header {
  text-shadow: none;
  color: black;
  text-align: left;
  font-size: 0.875rem;
  line-height: 1em;
}
.block_label {
}
.hash_value {
  overflow-x: auto;
  word-wrap: normal;
  min-height: 1em;
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
