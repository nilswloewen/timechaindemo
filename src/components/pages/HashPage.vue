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
      In computer science, a hash is a function that yields a short, unique
      output for every unique input of arbitrary length. In the process the
      input data is scrambled and mixed around, 'hashed' if you will, to
      derive the output.
    </p>

    <p>
      <b-row>
        <b-col cols="8">
          Bitcoin mining uses a particular hash function called SHA-256, which
          means the <a href="https://en.wikipedia.org/wiki/Secure_Hash_Algorithms">
          "Secure Hash Algorithm"</a> with an output length of 256 bits. The
          output is usually encoded in hexadecimal notation which makes a string
          of 64 characters. Watch this utter maniac calculate round 1/64 of SHA-256 BY HAND!
        </b-col>
        <b-col>
          <a href="https://youtu.be/y3dqhixzGVo">
            <img src="/assets/mine_by_hand.webp" alt="Mining Bitcoin by Hand" width="100%"/>
          </a>
        </b-col>
      </b-row>
    </p>
    <p>
      Part of why Bitcoin is known as a 'cryptocurrency' is because hash
      functions are used in cryptography. A hash can be used to validate that
      information has not been altered in transit even though it may not be
      encrypted. In the case of the Bitcoin blockchain, the hash of each
      block header (the block id) is used to verify that every node has the
      exact same copy of that block and all previous blocks.
    </p>

    In mining the hash is used in two ways:
    <ol>
      <li>To uniquely identify each block - the successful hash of the block
        header becomes the block ID. This is embedded in the next block header
        as the previous block hash.</li>
      <li>As a random number generator - hash is not actually random, </li>
    </ol>

    A 'blockchain' does not require proof of work.

    For example, the first four characters of the sha256d hash of these
    characters look random.

    <b-table-simple outlined striped hover id="hash_table" class="border-1" small>
      <b-thead head-variant="dark">
        <b-tr><b-th>Input</b-th> <b-th></b-th> <b-th>Output</b-th></b-tr>
      </b-thead>
      <b-tbody>
        <b-tr><b-td>'0'</b-td> <b-td>=></b-td> <b-td class="hash">c73c</b-td></b-tr>
        <b-tr><b-td>'1'</b-td> <b-td>=></b-td> <b-td class="hash">92c5</b-td></b-tr>
        <b-tr><b-td>'2'</b-td> <b-td>=></b-td> <b-td class="hash">a877</b-td></b-tr>
      </b-tbody>
    </b-table-simple>
  </Page>
</template>

<script>
import Page from '@/components/pages/Page.vue';

export default {
  components: {
    Page,
  },
};
</script>
