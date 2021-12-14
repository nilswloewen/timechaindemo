<template>
<div id="terms_section" class="section">
  <Page data-anchor="terms" first prev-section-btn slide>
    <h1>Terms</h1>

    <p>
      We must first understand a few concepts before we begin:
    </p>

    <p>
      Due to the technical nature of Bitcoin, there are some aspects of the system that look like
      gibberish to humans. The following pages will show that while this gibberish is not very
      human-readable, it is not non-sense.
    </p>
    <h4>Note:</h4>
    <p>
      There are many interactive elements in the following pages. If you are ever unsure of what to do,
      click the instructions icon
      <TermsNavTour v-on:start-tour="startTour"/>
      for help. Heck,
      try it now just for kicks!
    </p>
  </Page>

  <NotationSlide/>
  <HashFunctionsSlide/>
  <Sha256Slide/>
</div>
</template>

<script>
import Page from '@/components/Page.vue';
import HashFunctionsSlide from '@/components/sections/slides/HashFunctionsSlide.vue';
import NotationSlide from '@/components/sections/slides/NotationSlide.vue';
import Sha256Slide from '@/components/sections/slides/Sha256Slide.vue';
import TermsNavTour from '@/components/tours/TermsNavTour';

export default {
  components: {
    TermsNavTour,
    HashFunctionsSlide,
    NotationSlide,
    Page,
    Sha256Slide,
  },
  methods: {
    startTour() {
      this.$tours['terms_nav_tour'].start();
    },
  },
};
</script>
