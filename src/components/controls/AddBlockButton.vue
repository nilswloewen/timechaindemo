<template>
  <b-card no-body>
    <b-card-header header-bg-variant="info">
      <b-icon-wrench/> Add block
    </b-card-header>
    <b-card-body>
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
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  props: {
    disableAddBlockBtn: Boolean,
  },
  data() {
    return {
      newBlockData: 'Try adding a block...',
    };
  },
  methods: {
    addBlock() {
      this.$emit('add-block', this.newBlockData);
    },
  },
};
</script>
