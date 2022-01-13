<template>
<b-button v-b-popover.hover.top="getEncoding" :size="size" class="rotate_encoding_btn"
          title="Notation" @click="$emit('rotate-encoding')">
  <b-icon-vector-pen/>
</b-button>
</template>

<script>
export default {
  props: {
    encoding: String,
    size: { type: String, default: 'sm' },
  },
  computed: {
    getEncoding() {
      if (this.encoding) {
        return this.encoding.charAt(0).toUpperCase() + this.encoding.slice(1);
      }
    },
  },
};
</script>

<style>
.popover {
  color: white;
  font-family: 'Fira Code', monospace;
  text-shadow: #000 -1px 1px 4px;
  background-color: rgba(0, 0, 0, 0.8);
  border-color: white;
  box-shadow: -1px 2px 4px 2px white;
}

.popover-header {
  background-color: rgba(0, 0, 0, 0.8);
  border-bottom-color: rgba(255, 255, 255, 0.2);
}

.popover-body {
  color: inherit;
}

.rotate_encoding_btn {
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: -2px 3px 10px 2px rgba(255, 255, 255, 0.1);
}
</style>
