<template>
  <Page slide data-anchor="hash_functions" fp_bg>
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

    <h2>SHA-256</h2>
    <p>
      Bitcoin mining uses a particular hash function called SHA-256, which
      means <a href="https://en.wikipedia.org/wiki/Secure_Hash_Algorithms">
      Secure Hash Algorithm</a> with an output length of 256 bits. The
      output is usually encoded in hexadecimal notation as a string
      of 64 characters.
    </p>

    <b-card>
      For more details of how SHA-256 works watch this utter maniac calculate
      round 1/64 of SHA-256 BY HAND!
      <hr>
      <div class="text-center">
        <iframe style="margin-right: auto; margin-left: auto;" width="auto" height="auto" src="https://www.youtube.com/embed/y3dqhixzGVo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>
      </div>
    </b-card>

    <b-card no-body class="mt-4">
      <b-card-header header-bg-variant="info">
        <b-icon-wrench/> SHA-256 Calculator
      </b-card-header>
      <b-list-group-item class="list-field"> Input </b-list-group-item>
      <b-list-group-item class="list-value">
        <b-input-group prepend="Data" size="sm">
          <b-form-input @keyup="updateHash" :value="data" size="sm"/>
        </b-input-group>
      </b-list-group-item>
      <b-list-group-item class="list-field"> Output Hash </b-list-group-item>
      <b-list-group-item class="list-value"> {{ hash }} </b-list-group-item>
    </b-card>

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
import Page from '@/components/Page.vue';
import { sha256dFromText } from '@/services/utils';

export default {
  components: {
    Page,
  },
  data() {
    return {
      data: 'Try changing this data...',
      hash: '60759d1ab05baf2c79e281d8fbff268f559328dc45bd46b12114bbbe40197271',
    };
  },
  methods: {
    async updateHash(event) {
      this.data = event.target.value;
      this.hash = await sha256dFromText(this.data);
    },
  },
};
</script>
