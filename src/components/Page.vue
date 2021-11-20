<template>
  <div :id="id" :data-anchor="dataAnchor" :class="type">
    <div class="fp-bg" v-if="fp_bg"/>
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
export default {
  props: {
    dataAnchor: String,
    slide: Boolean,
    fp_bg: Boolean,
  },
  computed: {
    id() {
      if (this.slide) return `${this.dataAnchor}_slide`;
      return `${this.dataAnchor}_section`;
    },
    type() {
      if (this.slide) return 'slide';
      return 'section';
    },
  },
};
</script>
