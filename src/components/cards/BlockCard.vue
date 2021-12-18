<template>
<div>
  <!-- Chain-link icon -->
  <b-iconstack v-if="index > 0" class="mb-4" font-scale="3">
    <b-icon-link :style="getLinkColor" rotate="90" stacked/>
    <b-icon v-if="!isHashValid" icon="slash" stacked variant="danger"></b-icon>
  </b-iconstack>

  <b-card :id="`${type}_block_${index}`"
          :style="`box-shadow: -1px 2px 5px 0 ${block.color}; border-color: ${block.color}`"
          class="block_card"
          no-body>

    <b-card-header :key="getHash"
                   class="block_header update_box_shadow">
      <b-container>
        <b-row>
          <b-col>
            <div class="text-left block_number">Block #{{ block.height.toLocaleString() }}</div>
          </b-col>
          <b-col>
            <div class="text-center">Hash</div>
          </b-col>
          <b-col class="text-right">
            &nbsp;<span v-if="block.height === 0 && !showStats">(Genesis Block)</span>
            <template v-if="showStats && block.isHashValid">
              Guesses: {{ block.tries }}
              <div v-if="block.timeToMine > 0">Time: {{ block.timeToMine.toFixed(2) }}s</div>
            </template>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="hash_wrapper">
            <span v-if="isHashValid" :style="`background-color: ${block.color}`" class="hash_value valid">
              {{ getHash }}
            </span>
            <template v-else>
              <span :id="`block_${block.height}_hash`" class="hash_value invalid" role="button"
                    @click="onMineThisBlock">
                {{ getHash }}
              </span>
            </template>

          </b-col>
        </b-row>
      </b-container>
    </b-card-header>

    <template v-if="showBlockHeightInput">
      <div class="list label">Height</div>
      <div class="list value">
        <b-input-group size="sm">
          <b-form-input :max="blockHeightMax" :min="0"
                        :value="block.height" size="sm" type="number" @change="onBlockHeightChange"/>
          <b-button size="sm" style="border-top-left-radius: 0; border-bottom-left-radius: 0" variant="primary"
                    @click="$emit('update-block-height-latest')">
            Latest
          </b-button>
        </b-input-group>
      </div>
    </template>

    <!--Data-->
    <template v-if="showData">
      <div class="list label">Data</div>
      <div class="list value">
        <b-form-input :value="block.header.data" size="sm" @keyup="onDataChange"/>
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
    <div class="list label">Previous Block Hash</div>
    <div class="list value prev_block_hash_wrapper">
      <span :key="block.header.prevHash" :style="getPrevColor"
            class="rounded prev_block_hash update_box_shadow">
        {{ block.header.prevHash[localEncoding] }}
      </span>
    </div>

    <!--Nonce-->
    <template v-if="showNonce">
      <div style="width: 100%;">
        <b-list-group class="float-left">
          <div class="list label">Nonce</div>
          <div class="list value">
            <template v-if="maskNonce && !isHashValid"> ????????</template>
            <template v-else> {{ block.header.nonce }}</template>
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
      required: false,
    },
    localEncoding: String,
    maskNonce: Boolean,
    showBlockHeightInput: Boolean,
    showData: Boolean,
    showNonce: Boolean,
    showReal: Boolean,
    showStats: Boolean,
    type: String,
  },

  data() {
    return {
      blockHeightMax: 21000000,
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
    },
  },

  methods: {
    onMineThisBlock() {
      this.$emit('mine-this-block', this.index);
      this.$root.$emit('bv::hide::popover', `block_${ this.block.height }_hash`);
    },
    onDataChange(newData) {
      this.$emit('update-data', newData, this.index);
    },
    onBlockHeightChange(newHeight) {
      this.$emit('update-block-height', newHeight);
    },
  },
};
</script>

<style>
.valid {
  border-radius: 4px;
}

.update_box_shadow {
  animation: box_shadow 3s;
}

.block_number {
  font-weight: bold;
}

.hash_value {
  font-size: 0.875rem;
}

.invalid {
  border-radius: 4px;
  background-color: #b72919;
}
.prev_block_hash {
  padding: 2px;
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
