<template>
<div :id="id" :data-anchor="dataAnchor" :class="type">
  <div class="fp-bg"/>
  <b-container>
    <b-row>
      <b-col>
        <div class="page_content">
          <slot/>
        </div>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>

export default {
  props: {
    dataAnchor: String,
    activeEncoding: Number,
    slide: Boolean
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
};
</script>
