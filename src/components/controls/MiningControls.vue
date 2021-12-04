<template>
<b-card class="overlay mining_controls" no-body>
  <b-card-header>
    Mining for Block #{{ block.height }}
    <b-button class="rotate_encoding_btn float-right" @click="$emit('rotate-encoding')" size="sm">
      <b-icon-vector-pen/>
    </b-button>
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
  </b-list-group-item>


  <b-list-group-item v-if="showGoBrrr" class="list-value text-left">
    <span class="float-left" style="padding-top: 3px;"> Go Brrr </span>

    <b-button v-if="showSolutionBtn" @click="$emit('show-solution')" size="sm"
              :disabled="block.isHashValid" class="float-right">Show Solution</b-button>
    <b-form-checkbox class="float-left ml-2" style="padding-top: 1px;"
                     @change="onStartMining" switch :checked="isMining" :disabled="block.isHashValid"/>

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
    showSolutionBtn: Boolean,
    showGoBrrr: Boolean,
    target: Num,
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
  right: 50%;
  width: 554px;
}

.mining_controls .list-value {
  text-align: right;
}
</style>
