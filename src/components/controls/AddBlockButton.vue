<template>
  <b-card no-body class="mb-4">
    <b-input-group prepend="Data">
      <b-form-input :value="newBlockData" :disabled="disableAddBlockBtn"/>
      <b-button @click="$emit('add-block', newBlockData)" variant="primary"
                :disabled="disableAddBlockBtn">
        Add Block
      </b-button>
      <b-button @click="$emit('reset-blocks')">Reset</b-button>
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
};
</script>
