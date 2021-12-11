<template>
<div :ref="`block_${block.height}`">
  <!-- Chain-link icon -->
  <b-iconstack font-scale="3" v-if="index > 0" class="mb-4">
    <b-icon-link stacked rotate="90" :style="getLinkColor"/>
    <b-icon stacked icon="slash" variant="danger" v-if="!isHashValid"></b-icon>
  </b-iconstack>

  <b-card no-body class="block_card"
          :style="`box-shadow: -1px 2px 5px 0 ${block.color}; border-color: ${block.color}`">

    <b-card-header class="block_header update_box_shadow"
                   :key="getHash">
      <b-container>
        <b-row>
          <b-col>
            <div class="text-left block_number">Block #{{ block.height.toLocaleString() }}</div>
          </b-col>
          <b-col>
            <div class="text-center">Hash</div>
          </b-col>
          <b-col class="text-right">
            &nbsp;<span v-if="block.height === 0">(Genesis Block)</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="hash_wrapper">
            <span v-if="isHashValid" class="hash_value valid" :style="`background-color: ${block.color}`"> {{ getHash }} </span>
            <template v-else>
              <span class="hash_value invalid" :id="`block_${block.height}_hash`" role="button"
                    @click="onMineThisBlock">
                {{ getHash }}
              </span>

<!--              <b-popover :target="`block_${block.height}_hash`" triggers="hover">-->
<!--                <template #title>Invalid Hash</template>-->
<!--                Click on the hash to mine block.-->
<!--              </b-popover>-->
            </template>

          </b-col>
        </b-row>
      </b-container>
    </b-card-header>

    <template v-if="showBlockHeightInput">
      <div class="list label">Height</div>
      <div class="list value">
        <b-input-group size="sm">
          <b-form-input @change="onBlockHeightChange" :value="block.height"
                        :max="blockHeightMax" :min="0" type="number" size="sm"/>
          <b-button @click="$emit('update-block-height-latest')" variant="primary" size="sm"
                    style="border-top-left-radius: 0; border-bottom-left-radius: 0"
          >Latest
          </b-button>
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
    <div class="list label">Previous Block Hash</div>
    <div class="list value prev_block_hash_wrapper">
      <span class="rounded prev_block_hash update_box_shadow" :style="getPrevColor"
           :key="block.header.prevHash">
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
      required: false
    },
    localEncoding: String,
    maskNonce: Boolean,
    showBlockHeightInput: Boolean,
    showData: Boolean,
    showNonce: Boolean,
    showReal: Boolean,
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
    }
  },

  methods: {
    onMineThisBlock() {
      this.$emit('mine-this-block', this.index);
      this.$root.$emit('bv::hide::popover', `block_${this.block.height}_hash`)
    },
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
.valid {
  border-radius: 4px;
}
.update_box_shadow {
  animation: box_shadow 3s;
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
