<template>
  <div>
    <b-card no-body class="block">

      <b-card-header :style="getColor">
        Block Hash: <b>{{ this.hash }}</b> | Height: <b>{{ this.height }}</b>
      </b-card-header>

      <!-- Data -->
      <b-list-group-item class="list-field border-bottom-0"> Data </b-list-group-item>
      <b-list-group-item class="list-value">
        <b-form-input @change="onDataChange" :value="this.data" class="text-center"/>
      </b-list-group-item>

      <!-- Nonce -->
      <template v-if="typeof this.nonce != 'undefined'">
        <b-list-group-item class="list-field border-bottom-0"> Nonce </b-list-group-item>
        <b-list-group-item class="list-value">
          <b-input-group size="sm">
            <b-form-input id="nonce" @change="onNonceChange" :value="this.nonce" :state="isNonceValid" class="text-center" type="number"/>
            <b-button @click="incrementNonce" >+ 1</b-button>
            <b-button @click="solveNonce" variant="warning" :disabled="this.isNonceValid">Solve</b-button>
          </b-input-group>
        </b-list-group-item>
      </template>

      <!-- Previous block hash -->
      <b-list-group-item class="list-field border-bottom-0"> Previous block hash </b-list-group-item>
      <b-list-group-item class="list-value">
        <span :style="getPrevColor" class="rounded p-1"><b> {{ this.previousBlockHash }} </b></span>
      </b-list-group-item>

    </b-card>

    <b-iconstack font-scale="3" v-if="this.height > 0">
      <b-icon-link stacked rotate="90" :style="getLinkColor" />
      <!--      <b-icon stacked icon="slash" variant="danger" v-if="this.link"></b-icon>-->
    </b-iconstack>
  </div>
</template>

<script>
  export default {
    props:{
      color: String,
      data: String,
      hash: String,
      height: Number,
      index: Number,
      nonce: Number,
      isNonceValid: Boolean,
      prevColor: String,
      previousBlockHash: String,
    },

    computed: {
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
      }
    },
  }
</script>

<style>
  .block {
    margin-bottom: 0;
    margin-right: 1em;
  }
  #nonce {
    max-width: 120px;
  }
</style>