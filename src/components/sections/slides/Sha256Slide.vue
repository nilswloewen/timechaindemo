<template>
<Page data-anchor="sha256" last next-section-btn slide>
  <h1>SHA-256</h1>
  <p>
    Bitcoin mining uses a particular hash function called SHA-256, which
    means
    <Link href="https://en.wikipedia.org/wiki/Secure_Hash_Algorithms">
      Secure Hash Algorithm
    </Link>
    with an output length of 256 bits. The
    output is usually encoded in hexadecimal notation as a string
    of 64 characters.
  </p>

  <p>
    An output of 256 bits means there are 2<sup>256</sup> possible output hashes.
  </p>

  <ToolCard :encoding="encoding[activeEncoding]"
            encoding-btn title="Number of possible hashes" v-on:rotate-encoding="rotateEncoding">

    <div class="list label">
      {{ encoding[activeEncoding].charAt(0).toUpperCase() + encoding[activeEncoding].slice(1) }} Notation
    </div>
    <div class="list value pt-2">
      {{ hashMax[encoding[activeEncoding]] }}
    </div>
  </ToolCard>

  <p>
    For some context, it is estimated that there are ~10<sup>78</sup>
    <Link
      href="https://www.liverpoolmuseums.org.uk/stories/which-greater-number-of-atoms-universe-or-number-of-chess-moves">
      atoms in the observable universe.
    </Link>
    This means that every atom in the universe could have it's own SHA-256 hash!
  </p>

  <TldrCard>
    A hash can be interpreted as an absurdly large number.
  </TldrCard>

  <ToolCard id="sha256_calc_card" :encoding="encoding[activeEncoding]" encoding-btn
            title="SHA-256 Calculator" v-on:rotate-encoding="rotateEncoding">
    <template v-slot:tour>
      <Sha256Tour/>
    </template>

    <div class="list label">Input</div>
    <div class="list value">
      <b-input-group prepend="Data" size="sm">
        <b-form-input id="sha_calc_input" :value="data" size="sm" @keyup="updateHash"/>
      </b-input-group>
    </div>

    <div class="list label">Output Hash</div>
    <div class="list value output_hash">
      <span class="start_of_hash">{{ hash[encoding[activeEncoding]].slice(0, 3) }}</span>
      <span>{{ hash[encoding[activeEncoding]].slice(3) }}</span>
    </div>
  </ToolCard>

  <hr>

  <p>
    For more details of how SHA-256 works watch this utter madman calculate
    round 1/64 of SHA-256 BY HAND!
  </p>

  <div style="width: 350px; margin-right: auto; margin-left: auto;">
    <b-card no-body>
      <Link href="https://www.youtube.com/embed/y3dqhixzGVo">
        <img alt="thumbnail" class="img-card" height="197" src="/assets/mine_by_hand.webp" width="350"/>
      </Link>
    </b-card>
  </div>
</Page>
</template>

<script>
import InfoCard from '@/components/cards/InfoCard';
import TldrCard from '@/components/cards/TldrCard';
import ToolCard from '@/components/cards/ToolCard';
import Link from '@/components/Link';
import Page from '@/components/Page.vue';
import EncodingMixin from '@/mixins/EncodingMixin';
import Num from '@/services/Num';
import { sha256dFromText } from '@/services/sha256_utils';
import Sha256Tour from '@/components/tours/Sha256Tour';

export default {
  mixins: [
    EncodingMixin,
  ],
  components: {
    InfoCard,
    Link,
    Page,
    Sha256Tour,
    TldrCard,
    ToolCard,
  },
  data() {
    return {
      data: 'Try changing this data...',
      hash: { hexadecimal: '60759d1ab05baf2c79e281d8fbff268f559328dc45bd46b12114bbbe40197271' },
      hashMax: new Num(BigInt(Math.pow(2, 256)), 64),
    };
  },
  async mounted() {
    const hash = await sha256dFromText(this.data);
    this.hash = new Num(BigInt(`0x${ hash }`), 64);
  },
  methods: {
    async updateHash(event) {
      this.activeEncoding = 2;
      this.data = event.target.value;
      const hash = await sha256dFromText(this.data);
      this.hash = new Num(BigInt(`0x${ hash }`));
    },
    startTour(name) {
      this.$tours[name].start();
    },
  },
};
</script>
