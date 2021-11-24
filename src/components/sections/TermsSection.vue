<template>
  <div id="terms_section" class="section">
    <Page slide data-anchor="terms" fp_bg>
      <h1>Terms</h1>

      <p>
        Before we begin, a few key concepts must first be understood.
      </p>

      <p>
        Due to the technical nature of Bitcoin, there are some aspects of the system that look like
        gibberish to humans. Notably a Bitcoin address, transaction id, or block id. The following
        pages will show that while this gibberish is not very human-readable, it is not random.
      </p>

      <p>
        <b>Hash Functions</b> are the backbone to the blockchain and to mining.
        The result of these functions are represented with <b>Hexadecimal Notation</b>.
      </p>
    </Page>

    <HexNotationSlide/>
    <HashFunctionsSlide/>
    <Sha256Slide/>
  </div>
</template>

<script>
import HashFunctionsSlide from '@/components/sections/slides/HashFunctionsSlide.vue';
import HexNotationSlide from '@/components/sections/slides/HexNotationSlide.vue';
import Sha256Slide from '@/components/sections/slides/Sha256Slide.vue';
import Page from '@/components/Page.vue';

export default {
  components: {
    HashFunctionsSlide,
    HexNotationSlide,
    Page,
    Sha256Slide,
  },
};
</script>
