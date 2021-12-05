<template>
<b-card class="mining_controls" no-body>
  <b-card-body class="border-bottom">
    Mining Block #{{ block.height }}
    <b-icon-vector-pen class="rotate_encoding_btn float-right" @click="$emit('rotate-encoding')"/>
  </b-card-body>

  <!-- Max -->
  <div class="list-group-item list-field"> Max</div>
  <div class="list-group-item list-value">
    {{ hashMax[localEncoding] }}
  </div>

  <!-- Target -->
  <div class="list-group-item list-field" style="color: #f79413;">Target</div>
  <div class="list-group-item list-value" style="color: #f79413;">
    {{ target[localEncoding] }}
  </div>

  <!-- Hash -->
  <div class="list-group-item list-field"> Hash</div>
  <div class="list-group-item list-value">{{ block.hash[localEncoding] }}</div>

  <!--Nonce-->
  <div class="list-group-item list-field">Nonce</div>
  <div class="list-group-item list-value">
    <template v-if="interactiveNonce">
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
    </template>
    <template v-else>
      {{ block.header.nonce }}
    </template>
  </div>

  <div v-if="showGoBrrr" class="list-group-item list-value text-left">

    <b-form-checkbox class="float-left ml-2" style="padding-top: 1px;"
                     @change="onStartMining" switch :checked="isMining"/>
    <span class="float-left" style="padding-top: 3px;">
      Go Brrr (Automate)
    {{ block.timeToMine }} Seconds Elapsed
    </span>

    <b-button v-if="showSolutionBtn" @click="$emit('show-solution')" size="sm"
              :disabled="block.isHashValid" class="float-right">Show Solution</b-button>
  </div>

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
    interactiveNonce: Boolean,
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
.card.mining_controls {
  background-color: rgba(0, 0, 0, 0.8);
}
.card.mining_controls .card-header {
  background-color: #7855F5;
  border-color: #7855F5;
}
.mining_controls .list-value {
  text-align: right;
}
</style>
