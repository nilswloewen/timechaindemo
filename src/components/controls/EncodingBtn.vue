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

<style>
.popover {
  color: white;
  font-family: 'Fira Code', monospace;
  text-shadow: #000 -1px 1px 4px;
  background-color: rgba(0, 0, 0, 0.8);
}
.popover-header {
  background-color: rgba(0,0,0,0.8);
  border-bottom-color: rgba(255, 255, 255, 0.2);
}
.popover-body {
  color: inherit;
}

</style>
