<template>
<b-card class="overlay mining_controls" no-body>
  <b-card-header>
    Mining for Block #{{ block.height }}
  </b-card-header>

  <!--  Max -->
  <b-list-group-item class="list-field"> Max</b-list-group-item>
  <b-list-group-item class="list-value">
    {{ hashMax[localEncoding] }}
  </b-list-group-item>

  <!-- Target -->
  <b-list-group-item class="list-field" style="color: #f79413;"> Target</b-list-group-item>
  <b-list-group-item class="list-value" style="color: #f79413;">
    {{ target[localEncoding] }}
  </b-list-group-item>

  <!-- Hash -->
  <b-list-group-item class="list-field"> Hash</b-list-group-item>
  <b-list-group-item class="list-value">{{ block.hash[localEncoding] }}</b-list-group-item>

  <!--Nonce-->
  <b-list-group-item class="list-field">Nonce</b-list-group-item>
  <b-list-group-item class="list-value">
    <b-input-group size="sm">
      <b-form-input @change="onNonceChange"
                    :value="block.header.nonce" :state="block.isHashValid"
                    type="number" :min="0" :max="4294967295" size="sm"/>
      <b-button-group>
        <b-button size="sm" @click="onIncrementNonce" :disabled="block.isHashValid"
                  style="border-top-left-radius: 0; border-bottom-left-radius: 0;">
          +1
        </b-button>
      </b-button-group>
    </b-input-group>
    <b-form-checkbox @change="onStartMining" switch :checked="isMining" size="lg" :disabled="block.isHashValid">
      Go Brrr
    </b-form-checkbox>
  </b-list-group-item>
</b-card>
</template>

<script>
import Block from '@/services/block/Block';
import Num from '@/services/Num';

export default {
  props: {
    block: Block,
    hashMax: Num,
    index: Number,
    isMining: Boolean,
    localEncoding: String,
    target: Num
  },

  methods: {
    onStartMining() {
      this.$emit('start-mining', this.index);
    },
    onNonceChange(newNonce) {
      this.$emit('update-nonce', Number(newNonce), this.index);
    },
    onIncrementNonce() {
      this.$emit('update-nonce', this.block.header.nonce + 1, this.index);
    }
  }
};
</script>

<style>
.overlay {
  position: fixed;
  top: 6em;
  right: 75%;
  width: 160px;
}
.mining_controls .list-value {
  text-align: right;
}
</style>
