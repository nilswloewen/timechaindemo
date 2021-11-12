<template>
  <div class="section">
    <Page slide data-anchor="terms">
      <h1>Terms</h1>
      Before we begin, a few concepts must first be understood. Recent Bitcoin transactions
      are bundled together in a block and the block header is processed through a hash function.
      The output of this hash function becomes the block id.

      <a href="#hexadecimal_notation" @click="moveTo('terms', 1);">
        Hexadecimal Notation
      </a>
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
