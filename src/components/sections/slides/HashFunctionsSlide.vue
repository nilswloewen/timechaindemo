<template>
<Page data-anchor="hash_functions" slide>
  <h1>Hash Function</h1>
  <b-card class="definition_card">
    <h4>
      <Link href="https://www.etymonline.com/word/hash">hash (v.)</Link>
    </h4>
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

  <h5>
    Hash functions can answer the question:<br> <q>Are these two files exactly the same?</q>
  </h5>
  <br>

  <p>
    A hash can be thought of as the "digital fingerprint" of a file or set of data.
    For example, lets say you have two digital versions of an encyclopedia and you want to know if they
    contain exactly the same information. You could either tediously compare them word for word,
    or you could run each of them through a hash function and quickly compare the hashes.
    If each encyclopedia had the same hash or 'fingerprint', then you could be sure that they are
    exact copies of one another.
  </p>

  <p>
    A hash can sometimes be misunderstood as a compression or as an encryption. However, both
    compression and encryption are meant to be reversible; you can decompress a file
    back to its original size and you can decrypt a file back to its original contents.
  </p>

  <p>
    A hash is called a 'one-way function' because the input data can never be
    recovered from the output data. You cannot un-hash a hash.
  </p>

  <hr>
  <p>
    In mining a hash is used in two ways:
  </p>

  <ol>
    <li>
      To identify sets of transactions, called blocks. Because each block is different, each one
      has unique hash that becomes it's block ID.
    </li>
    <li>
      To make mining difficult; it takes time and work to compute a hash &mdash; especially if not all hashes are
      considered
      valid...
    </li>
  </ol>
</Page>
</template>

<script>
import Link from '@/components/Link';
import Page from '@/components/Page.vue';

export default {
  components: {
    Link,
    Page,
  },
};
</script>
