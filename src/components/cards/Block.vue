<template>
  <b-card no-body class="block">

    <b-card-header>
      Block Hash: {{ this.hash }}, Height: {{ this.height }}
      <b-button @click="finalizeBlock" size="sm" style="float: right;">Finalize Block</b-button>
    </b-card-header>

    <b-list-group-item class="list-field border-bottom-0">
      Data (transactions)
    </b-list-group-item>
    <b-list-group-item class="list-value">
      <b-form-input @change="onDataChange" :value="this.data" />
    </b-list-group-item>

    <b-list-group-item class="list-field border-bottom-0">
      Previous block hash
    </b-list-group-item>
    <b-list-group-item class="list-value">
      {{ this.previousBlockHash }}
    </b-list-group-item>

  </b-card>
</template>

<script>
  export default {
    props:{
      hash: String,
      height: Number,
      index: Number,
      data: String,
      previousBlockHash: String,
    },

    methods: {
      onDataChange(newData) {
        this.$emit('updateData', newData, this.index);
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
  }
  .block .card-header {
    background-color: aquamarine;
  }
</style>