<template>
  <Page slide data-anchor="hash_functions">
    <h1>Hash Function</h1>
    <b-card>
      <h4><a href="https://www.etymonline.com/word/hash">hash (v.)</a></h4>
      <hr>
      1650s, "to hack, chop into small pieces," from French hacher "chop up"
      (14c.), from Old French hache "ax" (see hatchet).
    </b-card>

    <p>
      In computer science, a hash is the output of a function that yields a short,
      unique output for each unique input of any length. In the process the
      input data is scrambled and mixed around, 'hashed' if you will, to derive
      the output.
    </p>

    <p>
      A hash can sometimes be misunderstood as a compression or encryption. However both
      compression and encryption are meant to be reversible; you can decompress a file
      back to its original size and you can decrypt a message back to its original meaning.
    </p>

    <p>
      A hash is called a 'one-way function' because the input data can never be
      recovered from the output data. You cannot un-hash a hash.
    </p>

    <p>
      In mining a hash is used in two ways:
    </p>
    <ol>
      <li>
        To identify sets of transactions, called blocks. Because each block is different, each one
        has unique hash.
      </li>
      <li>
        To make mining difficult; it takes time and work to compute a hash - especially if not all hashes are considered valid...
      </li>
    </ol>
  </Page>
</template>

<script>
import Page from '@/components/Page.vue';

export default {
  components: {
    Page,
  },
};
</script>
