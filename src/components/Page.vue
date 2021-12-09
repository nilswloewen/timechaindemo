<template>
<div :id="id" :data-anchor="dataAnchor" :class="getClasses">
  <div class="fp-bg"/>
  <b-container>
    <b-row>
      <b-col>
        <div class="page_content">
          <slot/>
          <div class="text-center mt-5">
            <b-button v-if="!this.first" size="sm" class="nav_btn previous_slide" @click="previousSlide">
              <b-icon-arrow-left/> Prev
            </b-button>

            <b-button v-if="this.prevSectionBtn" size="sm" class="nav_btn previous_section" @click="prevSection">
              <b-icon-arrow-up/> Prev
            </b-button>

            <b-button v-if="!this.last" size="sm" class="nav_btn next_slide" @click="nextSlide">
              Next <b-icon-arrow-right/>
            </b-button>

            <b-button v-if="this.nextSectionBtn" size="sm" class="nav_btn next_section" @click="nextSection">
              Next <b-icon-arrow-down/>
            </b-button>
          </div>

        </div>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>

export default {
  props: {
    activeEncoding: Number,
    dataAnchor: String,
    first: Boolean,
    last: Boolean,
    prevSectionBtn: Boolean,
    nextSectionBtn: Boolean,
    slide: Boolean,
  },
  computed: {
    getClasses() {
      return this.slide ? 'slide' : 'section';
    },
    id() {
      return this.slide ? `${ this.dataAnchor }_slide` : `${ this.dataAnchor }_section`;
    },
  },
};
</script>
