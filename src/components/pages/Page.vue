<template>
  <div :data-anchor="dataAnchor" :class="type">
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
  },
  computed: {
    type() {
      if (this.slide) return 'slide';
      return 'section';
    },
  },
};
</script>
