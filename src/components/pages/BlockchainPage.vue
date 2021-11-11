<template>
  <div class="section">
    <Page slide data-anchor="blockchain">
      <h1>Blockchain</h1>
      <p>
        <q>We propose a solution to the double-spending problem using a
          peer-to-peer network. The network timestamps transactions by hashing
          them into an ongoing chain of hash-based proof-of-work, forming a
          record that cannot be changed without redoing the proof-of-work.</q>
        - <a href="https://bitcoin.org/bitcoin.pdf">Bitcoin Whitepaper</a>
      </p>

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
