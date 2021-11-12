<template>
  <div class="section">
    <Page slide data-anchor="blockchain">
      <h1>Blockchain</h1>

      <b-card class="mb-4">
        <h4 class="text-left"><a href="https://www.etymonline.com/word/hash">blockchain (n.)</a></h4>
        <hr>
          <q>A blockchain is a chain of blocks.</q>
        <a href="https://t.co/HQwDRlKKx9" target="_blank">&nbsp;&mdash; Peter Todd</a>
      </b-card>

      <p>
        Bitcoin
      </p>
    </Page>

    <SimpleBlockchainPage />

  </div>
</template>

<script>
import Page from '@/components/pages/Page.vue';
import SimpleBlockchainPage from '@/components/pages/SimpleBlockchainPage.vue';

export default {
  components: {
    Page,
    SimpleBlockchainPage,
  },
};
</script>

<style>

</style>
