<template>
<b-button v-b-popover.hover.top="getEncoding" title="Notation" class="rotate_encoding_btn"
          @click="$emit('rotate-encoding')" size="sm">
  <b-icon-vector-pen/>
</b-button>
</template>

<script>
export default {
  props: {
    encoding: String,
  },
  computed: {
    getEncoding() {
      if (this.encoding) {
        return this.encoding.charAt(0).toUpperCase() + this.encoding.slice(1);
      }
    }
  }
}
</script>
