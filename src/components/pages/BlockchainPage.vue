<template>
  <div class="section">
    <Page slide data-anchor="blockchain">
      <h1>Blockchain</h1>

      <p>
        <q>A blockchain is a chain of blocks</q>
        - Peter Todd
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
