<template>
  <div class="section">
    <Page slide data-anchor="terms">
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

    <HexNotationPage/>
    <HashPage/>

  </div>
</template>

<script>
import HashPage from '@/components/pages/terms/HashPage.vue';
import HexNotationPage from '@/components/pages/terms/HexNotationPage.vue';
import Page from '@/components/pages/Page.vue';

export default {
  components: {
    HashPage,
    HexNotationPage,
    Page,
  },
};
</script>

<style>
  #hash_table {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
</style>
