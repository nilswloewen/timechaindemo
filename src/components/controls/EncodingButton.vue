<template>
  <b-dropdown class="encoding_btn" @click="onRotateEncoding" size="sm"
              split
              split-variant="outline-info"
              dropleft
              variant="info">
    <template #button-content>
      {{ header.substr(0, 3) }}
    </template>

    <template v-for="(item, index) in encoding">
      <b-dropdown-item :id="item" :key="item" :active="index === activeEncoding" @click="onSelectEncoding">
        {{ capitalize(item) }}
      </b-dropdown-item>
    </template>
  </b-dropdown>
</template>

<script>
export default {
  props: {
    encoding: {type: Array, default: ['binary', 'decimal', 'hexadecimal']},
    activeEncoding: {type: Number, default: 2},
  },
  watch: {
    activeEncoding() {
      this.header = this.capitalize(this.encoding[this.activeEncoding]);
    }
  },
  mounted() {
    this.header = this.capitalize(this.encoding[this.activeEncoding]);
  },
  methods: {
    onRotateEncoding() {
      this.$emit('rotate-encoding');
      this.activeEncoding += 1;
      this.activeEncoding %= this.encoding.length;
      this.header = this.capitalize(this.encoding[this.activeEncoding]);
    },
    onSelectEncoding(e) {
      this.$emit('update-active-encoding', this.encoding.indexOf(e.target.id));
      this.header = this.capitalize(this.encoding[this.encoding.indexOf(e.target.id)]);
    },
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  },
  data() {
    return {
      activeEncoding: 2,
      header: 'Hex',
    }
  }
}
</script>

<style>
  .slide.active .encoding_btn {
    display: inline;
    position: relative;
    left: 90%;
  }
  .encoding_btn {
    display: none;
  }
  .encoding_btn ul {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .encoding_btn ul a {
    color: white;
  }
</style>
