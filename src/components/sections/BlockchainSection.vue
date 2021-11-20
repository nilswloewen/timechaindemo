<template>
  <div id="blockchain_section" class="section">
    <Page slide data-anchor="blockchain" fp_bg>
      <h1>Blockchain</h1>

      <b-card>
        <h4 class="text-left">blockchain (n.)</h4>
        <hr>
        <q>A blockchain is a chain of blocks.</q>
        &nbsp;&mdash;&nbsp;<a href="https://t.co/HQwDRlKKx9" target="_blank">Peter Todd</a>
      </b-card>

      <p>
        A blockchain is a data structure that uses hashes to prove that previous
        blocks existed before following blocks, therefore establishing an <b>Order of Events</b>.
      </p>

      <p>
        In Bitcoin a block is a batch of recent transactions and some metadata
        about the block, such as the current time.
      </p>
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
