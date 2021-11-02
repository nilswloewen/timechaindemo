<template>
  <b-card no-body>

    <b-card-header class="block-header">
      Block Id (hash): {{this.hash}}, Height: {{this.height}}
    </b-card-header>

    <b-card-text>

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

    </b-card-text>

  </b-card>
</template>

<script>
  import {sha256d_from_text} from "@/services/utils";

  export default {
    props:{
      previousBlockHash: {
        type: String,
        default: '0000',
      },
      previousBlockHeight: {
        type: Number,
        default: -1,
      },
      data: String,
      height: Number,
    },
    data() {
      return{
        hash: ''
      }
    },

    async mounted() {
      const hash = await sha256d_from_text(this.data);
      this.hash = hash.substr(0, 4);
    },
    methods: {
      onDataChange(newData) {
        this.$emit('updateData', newData);
      },
    },
  }
</script>

<style>
  .block-header {
    background-color: aquamarine;
  }
</style>