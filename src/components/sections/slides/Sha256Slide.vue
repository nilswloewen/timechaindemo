<template>
<Page slide data-anchor="sha256"
      encoding-btn
      :active-encoding="activeEncoding"
      :encoding="encoding"
      v-on:rotate-encoding="rotateEncoding"
      v-on:update-active-encoding="updateActiveEncoding">
  <h1>SHA-256</h1>
  <p>
    Bitcoin mining uses a particular hash function called SHA-256, which
    means <a href="https://en.wikipedia.org/wiki/Secure_Hash_Algorithms">
    Secure Hash Algorithm</a> with an output length of 256 bits. The
    output is usually encoded in hexadecimal notation as a string
    of 64 characters.
  </p>

  <p>
    An output of 256 bits means there are 2<sup>256</sup>-1 possible output hashes.
  </p>

  <b-card no-body>
    <b-card-header>
     <span class="float-left">Number of possible hashes</span>
      <b-button class="rotate_encoding_btn float-right" @click="rotateEncoding" size="sm">
        <b-icon-vector-pen/>
      </b-button>
    </b-card-header>
    <b-list-group-item class="list-value pt-2">
      {{ hashMax[encoding[activeEncoding]] }}
    </b-list-group-item>
  </b-card>

  <p>
    For some context, it is estimated that there are
    <a href="https://www.liverpoolmuseums.org.uk/stories/which-greater-number-of-atoms-universe-or-number-of-chess-moves">
      ~10<sup>78</sup> atoms in the observable universe</a>.
    This means that every atom in the universe could have it's own SHA-256 hash!
  </p>

  <hr>

  <b-card no-body class="mt-4">
    <b-card-header header-bg-variant="info">
      <span class="float-left"><b-icon-wrench/> SHA-256 Calculator </span>
      <b-button class="rotate_encoding_btn float-right" @click="rotateEncoding" size="sm">
        <b-icon-vector-pen/>
      </b-button>
      <b-button class="float-right mr-2" v-b-toggle.collapse_note size="sm" style="background-color: transparent; border: none;"><b-icon-info-circle/></b-button>
    </b-card-header>

    <b-collapse id="collapse_note">
      <b-card-body class="border-bottom pb-0">
        In this demo all hashes are calculated as double SHA-256 or sha256d,
        exactly as bitcoin-core does it.
        <p>swapEndian( sha256( sha256( data ) ) )</p>
      </b-card-body>
    </b-collapse>

    <b-list-group-item class="list-field">Input</b-list-group-item>
    <b-list-group-item class="list-value">
      <b-input-group prepend="Data" size="sm">
        <b-form-input @keyup="updateHash" :value="data" size="sm"/>
      </b-input-group>
    </b-list-group-item>

    <b-list-group-item class="list-field">Output Hash</b-list-group-item>
    <b-list-group-item class="list-value">{{ hash[encoding[activeEncoding]] }}</b-list-group-item>
  </b-card>

  <hr>

  <p>
    For more details of how SHA-256 works watch this utter madman calculate
    round 1/64 of SHA-256 BY HAND!
  </p>

  <div style="width: 350px; margin-right: auto; margin-left: auto;">
    <b-card no-body>
      <iframe width="auto" height="197px" src="https://www.youtube.com/embed/y3dqhixzGVo" title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen/>
    </b-card>
  </div>
</Page>
</template>

<script>
import EncodingMixin from '@/mixins/EncodingMixin';
import Page from '@/components/Page.vue';
import { sha256dFromText } from '@/services/sha256_utils';
import Num from '@/services/Num';

export default {
  mixins: [
    EncodingMixin
  ],
  components: {
    Page
  },
  data() {
    return {
      data: 'Try changing this data...',
      hash: { hexadecimal: '60759d1ab05baf2c79e281d8fbff268f559328dc45bd46b12114bbbe40197271' },
      hashMax: new Num(BigInt(`0x${ ''.padEnd(64, 'f') }`), 64)
    };
  },
  async mounted() {
    const hash = await sha256dFromText(this.data);
    this.hash = new Num(BigInt(`0x${ hash }`), 64);
  },
  methods: {
    async updateHash(event) {
      this.data = event.target.value;
      const hash = await sha256dFromText(this.data);
      this.hash = new Num(BigInt(`0x${ hash }`));
    }
  }
};
</script>
