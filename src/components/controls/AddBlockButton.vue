<template>
  <b-card no-body class="mb-4">
    <b-input-group prepend="Data" size="sm">
      <b-form-input v-model="newBlockData" :disabled="disableAddBlockBtn" size="sm"/>
      <b-button @click="addBlock" variant="primary" size="sm"
                :disabled="disableAddBlockBtn">
        Add Block
      </b-button>
      <b-button @click="$emit('reset-blocks')" size="sm">
        <b-icon-trash/>
      </b-button>
    </b-input-group>
  </b-card>
</template>

<script>
export default {
  props: {
    disableAddBlockBtn: Boolean,
  },
  data() {
    return {
      newBlockData: '',
    };
  },
  methods: {
    addBlock() {
      this.$emit('add-block', this.newBlockData);
    },
  },
};
</script>
