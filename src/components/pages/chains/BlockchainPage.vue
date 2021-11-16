<template>
  <div class="section">
    <Page slide data-anchor="blockchain">
      <h1>Blockchain</h1>

      <b-card>
        <h4 class="text-left">blockchain (n.)</h4>
        <hr>
        <q>A blockchain is a chain of blocks.</q>
        <a href="https://t.co/HQwDRlKKx9" target="_blank">&nbsp;&mdash; Peter Todd</a>
      </b-card>

      <p>
        The goal of a blockchain is to be an immutable data structure. As in, it is
        easy to add new information, but impossible to change previous.
        You can think of a blockchain as a write-only
        As in, it is impossible to change
      </p>

      <h2>Immutable ledger</h2>

      Order of events
      Previous hash <b>must have</b> existed before following hash.

      To change an old block's data, one would need to take the time to
      recalculate that block's hash, and all following block hashes. Even with a
      million blocks the time of these recalculations would be in minutes or
      seconds - in other words, negligible. Therefore this non-proof-of-work blockchain is useless.

      This is the basic structure of a proof-of-stake system.

      The next slide is a simple example of a hash-based blockchain.
    </Page>

    <SimpleBlockchainPage />

    <Page data-anchor="simple_benefits" slide>

      Benefits:
      <ul>
        <li>Easy to verify copies of blockchain are exactly alike through latest block hash.</li>
        <li>Easy to add new data (a new block)</li>
        <li>Difficult/impossible to change old data.</li>
      </ul>

      Cons:
      Basically an inefficient database.
    </Page>

  </div>
</template>

<script>
import Page from '@/components/pages/Page.vue';
import SimpleBlockchainPage from '@/components/pages/chains/SimpleBlockchainPage.vue';

export default {
  components: {
    Page,
    SimpleBlockchainPage,
  },
};
</script>
