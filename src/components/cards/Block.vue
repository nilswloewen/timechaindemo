<template>
  <div>
    <b-card no-body class="block">

      <b-card-header>
        <b-button-group style="line-height: 2em;">
          Block Hash:
          <b-form-input  id="block_hash" :style="getColor" class="p-1 border-0 fw-bold"
                         :value="hash" :disabled="true" :state="isHashValid"/>
          | Height: <b>{{ this.height }}</b>
        </b-button-group>
      </b-card-header>

      <!-- Data -->
      <b-list-group-item class="list-field"> Data </b-list-group-item>
      <b-list-group-item class="list-value">
        <b-form-input @change="onDataChange" :value="this.data" class="text-center"/>
      </b-list-group-item>

      <!-- Nonce -->
      <template v-if="typeof this.nonce != 'undefined'">
        <b-list-group-item class="list-field"> Nonce </b-list-group-item>
        <b-list-group-item class="list-value">
          <b-input-group class="justify-content-center p-1">
            <b-button-group>
              <b-form-input id="nonce" class="text-center" @change="onNonceChange"
                            :value="nonce" :state="isHashValid"  type="number"/>
              <b-button @click="incrementNonce">+ 1</b-button>
              <b-button @click="solveNonce" variant="warning">Solve</b-button>
            </b-button-group>
            <div class="p-2" v-if="typeof this.tries !== 'undefined'">Tries: {{this.tries}}</div>
          </b-input-group>
        </b-list-group-item>
      </template>

      <!-- Previous block hash -->
      <b-list-group-item class="list-field"> Previous block hash </b-list-group-item>
      <b-list-group-item class="list-value">
        <span :style="getPrevColor" class="rounded p-1"><b> {{ this.previousBlockHash }} </b></span>
      </b-list-group-item>

    </b-card>

    <b-iconstack font-scale="3" v-if="this.height > 0">
      <b-icon-link stacked rotate="90" :style="getLinkColor" />
      <b-icon stacked icon="slash" variant="danger" v-if="!this.isHashValid"></b-icon>
    </b-iconstack>
  </div>
</template>

<script>
export default {
  props: {
    color: String,
    data: String,
    hash: String,
    height: Number,
    index: Number,
    isHashValid: Boolean,
    nonce: Number,
    prevColor: String,
    previousBlockHash: String,
    tries: Number,
  },

  computed: {
    getStyle() {
      const color = this.isHashValid ? 'black' : 'red';
      return `color: ${color};`;
    },
    getColor() {
      return `background-color: ${this.color};`;
    },
    getPrevColor() {
      return `background-color: ${this.prevColor};`;
    },
    getLinkColor() {
      return `color: ${this.prevColor};`;
    },
  },

  methods: {
    solveNonce() {
      this.$emit('solveNonce', this.index);
    },
    incrementNonce() {
      this.$emit('updateNonce', Number(this.nonce) + 1, this.index);
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
  #block_hash {
    max-width: 60px;
  }
  #nonce {
    max-width: 120px;
  }
</style>
