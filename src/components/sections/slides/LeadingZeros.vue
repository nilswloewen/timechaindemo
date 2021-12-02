<template>
<Page data-anchor="leading_zeros" slide>
  <h1>Leading Zeros</h1>

  <p>
    It is a common misconception that a block hash is required to have a certain
    number of leading zeros. For example, the hash of the Genesis block is:
  </p>
  <p>
    <b>0000000000</b>19d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
  </p>
  <p>The first 9 digits are zeros. In binary </p>

  <p>
    <q>The proof-of-work involves scanning for a value that when hashed, such as with SHA-256, the
      hash begins with a number of zero bits. The average work required is exponential in the number
      of zero bits required and can be verified by executing a single hash.</q>
    <br> - <a href="https://bitcoin.org/bitcoin.pdf">Satoshi Nakamoto</a>
  </p>
  <p>

  </p>
</Page>
</template>

<script>
import Page from '@/components/Page';

export default {
  components: {
    Page
  }
};
</script>
