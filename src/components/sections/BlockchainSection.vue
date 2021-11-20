<template>
  <div id="blockchain_section" class="section">
    <Page slide data-anchor="blockchain" fp_bg>
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

    <SimpleBlockchainSlide/>

  </div>
</template>

<script>
import Page from '@/components/Page.vue';
import SimpleBlockchainSlide from '@/components/sections/slides/SimpleBlockchainSlide.vue';

export default {
  components: {
    Page,
    SimpleBlockchainSlide,
  },
};
</script>
