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
        <a href="#hash_functions" @click="moveTo('terms', 2);">
         Hash Functions
        </a>
         are the backbone to the blockchain and to mining. The result of these functions
        are represented with <a href="#hexadecimal_notation" @click="moveTo('terms', 1);">
        Hexadecimal Notation</a>.
      </p>
    </Page>

    <HexNotationSlide/>
    <HashFunctionsSlide/>

  </div>
</template>

<script>
import HashFunctionsSlide from '@/components/sections/slides/HashFunctionsSlide.vue';
import HexNotationSlide from '@/components/sections/slides/HexNotationSlide.vue';
import Page from '@/components/Page.vue';

export default {
  components: {
    HashFunctionsSlide,
    HexNotationSlide,
    Page,
  },
};
</script>
