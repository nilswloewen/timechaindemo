<template>
<div :id="id" :class="getClasses" :data-anchor="dataAnchor">
  <b-container>
    <b-row>
      <b-col>
        <div class="page_content">
          <slot/>
          <div class="nav_btn_wrapper text-center mt-5">
            <b-button v-if="!this.first" class="nav_btn previous_slide" size="sm" @click="previousSlide">
              <b-icon-arrow-left/>
              Prev
            </b-button>

            <b-button v-if="this.prevSectionBtn" class="nav_btn previous_section" size="sm" @click="prevSection">
              <b-icon-arrow-up/>
              Prev
            </b-button>

            <b-button v-if="!this.last" class="nav_btn next_slide" size="sm" @click="nextSlide">
              Next
              <b-icon-arrow-right/>
            </b-button>

            <b-button v-if="this.nextSectionBtn" class="nav_btn next_section" size="sm" @click="nextSection">
              Next
              <b-icon-arrow-down/>
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
    nextSectionBtn: Boolean,
    prevSectionBtn: Boolean,
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
