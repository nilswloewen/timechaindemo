<template>
  <Page data-anchor="terms">

    <div class="slide">
      <h3>Terms</h3>
    </div>

    <div class="slide" data-anchor="hexadecimal_notation">
      <h3>Hexadecimal Notation</h3>
      <HexTable/>
    </div>

    <div class="slide">
      <h3>Hash Function</h3>
      <b-card>
        <h4><a href="https://www.etymonline.com/word/hash">hash (v.)</a></h4>
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
        Bitcoin mining uses a particular hash function called SHA-256, which
        means the <a href="https://en.wikipedia.org/wiki/Secure_Hash_Algorithms">
        "Secure Hash Algorithm"</a> with an output length of 256 bits. The
        output is usually encoded in hexadecimal notation which makes a string
        of 64 characters. <a href="https://youtu.be/y3dqhixzGVo">SHA-256 by hand</a>
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
    </div>
  </Page>
</template>

<script>
import Page from '@/components/pages/Page.vue';
import HexTable from '@/components/HexTable.vue';

export default {
  components: {
    HexTable,
    Page,
  },
};
</script>

<style>
  #hash_table {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
</style>
