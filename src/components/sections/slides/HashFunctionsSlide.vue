<template>
  <Page slide data-anchor="hash_functions">
    <h1>Hash Function</h1>
    <b-card>
      <h4 class="text-left"><a href="https://www.etymonline.com/word/hash">hash (v.)</a></h4>
      <hr>
      1650s, "to hack, chop into small pieces," from French hacher "chop up"
      (14c.), from Old French hache "ax" (see hatchet).
    </b-card>

    <p>
      In computer science, a hash is the output of a function that yields a short,
      unique output for each unique input of arbitrary length. In the process the
      input data is scrambled and mixed around, 'hashed' if you will, to derive
      the output.
    </p>

    <p>
      A hash can be thought of as the digital fingerprint of a piece of data. If
      even one bit in the input data is changed the entire output hash becomes wildly different.
    </p>
    <p>
      While the output of a hash may look random, it is not, it is simply unpredictable.
      <b>
        The only way to find a hash is to take the time to put in the work of calculating it.
      </b>
    </p>

    <p>
      A hash can sometimes be misunderstood as a compression or as an encryption. However both
      compression and encryption are meant to be reversible; you can decompress a file
      back to its original size and you can decrypt a message back to its original meaning.
    </p>

    <p>
      A hash is called a 'one-way function' because the input data can never be
      recovered from the output data. You cannot un-hash a hash.
    </p>
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
