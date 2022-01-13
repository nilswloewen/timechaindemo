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

    <hr>
    <div class="d-flex">
      <TermsNavTour/>
      There are many interactive elements in the following pages. If you are ever unsure of what to do,
      click the instructions icon
      for help. Heck, try it now just for kicks!
    </div>

  </Page>

  <NotationSlide/>
  <HashFunctionsSlide/>
  <Sha256Slide/>
</div>
</template>

<script>
import HashFunctionsSlide from '@/components/sections/slides/HashFunctionsSlide.vue';
import NotationSlide from '@/components/sections/slides/NotationSlide.vue';
import Page from '@/components/Page.vue';
import Sha256Slide from '@/components/sections/slides/Sha256Slide.vue';
import TermsNavTour from '@/components/tours/TermsNavTour';

export default {
  components: {
    HashFunctionsSlide,
    NotationSlide,
    Page,
    Sha256Slide,
    TermsNavTour,
  },
};
</script>

<style>
#terms_section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/small_brain.webp');
}
</style>
