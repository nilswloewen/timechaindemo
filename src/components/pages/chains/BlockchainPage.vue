<template>
  <div class="section">
    <Page slide data-anchor="blockchain">
      <h1>Blockchain</h1>

      <b-card>
        <h4 class="text-left">blockchain (n.)</h4>
        <hr>
        <q>A blockchain is a chain of blocks.</q>
        &nbsp;&mdash;<a href="https://t.co/HQwDRlKKx9" target="_blank"> Peter Todd</a>
      </b-card>

      <p>
        A block is simply a set of data. In Bitcoin a block is a batch of recent transactions and
        some metadata about the block, such as the current time.
      </p>

      <p>
        A blockchain is a data structure that uses hashes to prove that previous
        blocks existed before following blocks.
      </p>

      <p>
        The most important takeaway about a blockchain is that it establishes an <b>
        Order of Events</b>.

        Previous hash <b>must have</b> existed before following hash.
      </p>

      250-860-9888 Tel-tronics
    </Page>

    <SimpleBlockchainPage />

    <!--    <Page data-anchor="simple_benefits" slide>-->

    <!--      Benefits:-->
    <!--      <ul>-->
    <!--        <li>Easy to verify copies of blockchain are exactly alike through latest block hash.</li>-->
    <!--        <li>Easy to add new data (a new block)</li>-->
    <!--        <li>Difficult/impossible to change old data.</li>-->
    <!--      </ul>-->

    <!--      Cons:-->
    <!--      Basically an inefficient database.-->
    <!--    </Page>-->

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
