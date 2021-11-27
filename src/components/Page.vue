<template>
<div :id="id" :data-anchor="dataAnchor" :class="type">
  <div class="fp-bg"/>
  <EncodingButton v-if="encodingBtn"
                  :active-encoding="activeEncoding"
                  :encoding="encoding"
                  v-on:update-active-encoding="updateActiveEncoding"
                  v-on:rotate-encoding="rotateEncoding"/>

  <b-container>
    <b-row>
      <b-col>
        <slot/>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
import EncodingButton from '@/components/controls/EncodingButton';

export default {
  props: {
    dataAnchor: String,
    encodingBtn: Boolean,
    encoding: Array,
    activeEncoding: Number,
    slide: Boolean
  },
  components: {
    EncodingButton
  },
  computed: {
    id() {
      if (this.slide) return `${ this.dataAnchor }_slide`;
      return `${ this.dataAnchor }_section`;
    },
    type() {
      if (this.slide) return 'slide';
      return 'section';
    }
  },
  methods: {
    rotateEncoding() {
      this.$emit('rotate-encoding');
    },
    updateActiveEncoding(newEncoding) {
      this.$emit('update-active-encoding', newEncoding);
    }
  }
};
</script>
