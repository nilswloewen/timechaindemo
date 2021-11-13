<template>
  <b-card no-body header="Complexity" class="mb-4">
    <b-input-group prepend="Min 2" append="Max 64" size="sm">
      <b-form-input :title="hexDigits" type="range" size="sm" :min="2" :max="64"
                    :value="hexDigits" @change="updateHexDigits"/>
    </b-input-group>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      hexDigits: 2,
    };
  },
  methods: {
    updateHexDigits(newLimit) {
      this.hexDigits = Number(newLimit);
      this.$emit('update-hex-digits', this.hexDigits);
    },
  },
};
</script>
