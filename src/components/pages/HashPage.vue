<template>
  <Page slide data-anchor="hash_functions">
    <h1>Hash Function</h1>
    <b-card class="mb-4">
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
      even one bit in the input data is changed the entire hash becomes wildly different.
      While the output of a hash may look random it is not, it is simply unpredictable.
      The only way to find a hash is to put in the work of calculating it.
    </p>

    For example, the first four characters of the SHA-256 hash of these
    characters look random.

    <b-card no-body class="mb-4 mt-4" header="SHA-256 Calculator">
      <b-list-group-item class="list-field">
        Input
      </b-list-group-item>
      <b-list-group-item class="list-value">
        <b-input-group prepend="Data" size="sm">
          <b-form-input @change="updateHash" :value="data" size="sm"/>
        </b-input-group>
      </b-list-group-item>
      <b-list-group-item class="list-field">
        Output Hash
      </b-list-group-item>
      <b-list-group-item class="list-value">
        {{ hash }}
      </b-list-group-item>
    </b-card>

    <p>
      <b-row>
        <b-col cols="8">
          Bitcoin mining uses a particular hash function called SHA-256, which
          means <a href="https://en.wikipedia.org/wiki/Secure_Hash_Algorithms">
          Secure Hash Algorithm</a> with an output length of 256 bits. The
          output is usually encoded in hexadecimal notation as a string
          of 64 characters. Watch this utter maniac calculate round 1/64 of SHA-256 BY HAND!
        </b-col>
        <b-col>
          <a href="https://youtu.be/y3dqhixzGVo">
            <img src="/assets/mine_by_hand.webp" alt="Mining Bitcoin by Hand" width="100%"/>
          </a>
        </b-col>
      </b-row>
    </p>

    <div>
      In mining the hash is used in two ways:
      <ol>
        <li>To uniquely identify each block
          <br> - The successful hash of the block header becomes the block ID.
          This is embedded in the next block header as the previous block hash.
        </li>
        <li>As a random number generator
          <br> - A hash is neither random nor a number; a hash is simply a string of bits.
          However, in order to make bitcoin mining difficult, a block hash is interpreted
          as a number that must be less than an arbitrary target.
        </li>
      </ol>
    </div>

  </Page>
</template>

<script>
import Page from '@/components/pages/Page.vue';
import { sha256dFromText } from '@/services/utils';

export default {
  components: {
    Page,
  },
  data() {
    return {
      data: 'Try changing this data',
      hash: '60759d1ab05baf2c79e281d8fbff268f559328dc45bd46b12114bbbe40197271',
    };
  },
  methods: {
    async updateHash(newData) {
      console.log(newData);
      this.data = newData;
      this.hash = await sha256dFromText(this.data);
    },
  },
};
</script>

<style>
  #hash_table {
    max-width: 100%;
  }
  #hash_table td:nth-child(3) {
    width: 40px;
    overflow-x: auto;
  }
  .list-field {
    font-size: .8em;
    padding-bottom: 0;
    border-bottom: none;
  }
  .list-value {
    padding-top: 0;
  }
</style>
