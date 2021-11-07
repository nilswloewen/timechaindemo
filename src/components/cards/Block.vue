<template>
  <div>
    <!-- Chain-link icon -->
    <b-iconstack font-scale="3" v-if=" this.index > 0">
      <b-icon-link stacked rotate="90" :style="getLinkColor" />
      <b-icon stacked icon="slash" variant="danger" v-if="!this.isHashValid"></b-icon>
    </b-iconstack>

    <b-card no-body class="block">
      <b-card-header>
        <b-button title="Block Height" style="float: left;" :disabled="true" size="sm">
          Block #{{ this.height }}
        </b-button>
        <b-button-group style="line-height: 2em;">
          <b-form-input id="block_hash" title="Hash" :style="getColor" class="p-1 border-0 fw-bold"
                        :value="hash" :disabled="true" :state="isHashValid"/>
        </b-button-group>
      </b-card-header>

      <!-- Data -->
      <b-list-group-item class="list-field"> Data </b-list-group-item>
      <b-list-group-item class="list-value">
        <b-form-input @change="onDataChange" :value="data" class="text-center"/>
      </b-list-group-item>

      <!-- Nonce -->
      <template v-if="typeof this.nonce != 'undefined'">
        <b-list-group-item class="list-field"> Nonce </b-list-group-item>
        <b-list-group-item class="list-value">
          <b-input-group class="justify-content-center p-1">
            <b-button-group>
              <b-form-input id="nonce" class="text-center" @change="onNonceChange"
                            :value="nonce" :state="isHashValid"  type="number"/>
              <b-button @click="incrementNonce" :disabled="isHashValid">+ 1</b-button>
              <b-button @click="solveNonce" variant="warning">Solve</b-button>
            </b-button-group>
            <div class="p-2" v-if="typeof this.tries !== 'undefined'">Tries: {{tries}}</div>
          </b-input-group>
        </b-list-group-item>
      </template>

      <!-- Previous block hash -->
      <b-list-group-item class="list-field"> Previous block hash </b-list-group-item>
      <b-list-group-item class="list-value">
        <span :style="getPrevColor" class="rounded p-1"><b> {{ previousBlockHash }} </b></span>
      </b-list-group-item>

    </b-card>
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
      return `color: ${this.color};`;
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
  .block .card-header button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: black;
  }
  #block_hash {
    max-width: 60px;
  }
  #nonce {
    max-width: 120px;
  }
</style>
