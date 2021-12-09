<template>
<div id="terms_section" class="section">
  <Page first slide prev-section-btn data-anchor="terms">
    <h1>Terms</h1>

    <p>
      We must first understand a few concepts before we begin:
    </p>

    <p>
      Due to the technical nature of Bitcoin, there are some aspects of the system that look like
      gibberish to humans. The following pages will show that while this gibberish is not very
      human-readable, it is not non-sense.
    </p>

    <p>
      <b>The SHA-256 Hash Function</b> is the backbone to the timechain and to mining. The output of this
      function is represented with <b>Hexadecimal Notation</b>.
    </p>
  </Page>

  <NotationSlide/>
  <HashFunctionsSlide/>
  <Sha256Slide/>
</div>
</template>

<script>
import HashFunctionsSlide from '@/components/sections/slides/HashFunctionsSlide.vue';
import NotationSlide from '@/components/sections/slides/NotationSlide.vue';
import Sha256Slide from '@/components/sections/slides/Sha256Slide.vue';
import Page from '@/components/Page.vue';

export default {
  components: {
    HashFunctionsSlide,
    NotationSlide,
    Page,
    Sha256Slide
  }
};
</script>

<style>
.fp-viewing-terms-terms .fp-controlArrow.fp-prev,
.fp-viewing-terms-sha256 .fp-controlArrow.fp-next {
  display: none;
}
</style>
