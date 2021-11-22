<template>
  <b-dropdown id="encoding_btn" text="&#x1f522;" @click="$emit('rotate-encoding')" size="sm"
              split
              split-variant="outline-info"
              dropleft
              variant="info">
    <template #button-content>
      <b-icon-vector-pen/>
    </template>

    <template v-for="(item, index) in encoding">
      <b-dropdown-item :id="item" :key="item" :active="index === activeEncoding" @click="onSelectEncoding">
        {{ item.charAt(0).toUpperCase() + item.slice(1) }}
      </b-dropdown-item>
    </template>
  </b-dropdown>

</template>

<script>
export default {
  props: {
    activeEncoding: Number,
    encoding: {type: Array},
  },
  methods: {
    onSelectEncoding(e) {
      this.$emit('update-active-encoding', this.encoding.indexOf(e.target.id));
    },
  }
}
</script>

<style>
  #encoding_btn {
    position: fixed;
    right: 15px;
    top: 25%;
    z-index: 100;
  }
</style>
