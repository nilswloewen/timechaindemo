<template>
<Page last slide next-section-btn data-anchor="sha256">
  <h1>SHA-256</h1>
  <p>
    Bitcoin mining uses a particular hash function called SHA-256, which
    means <Link href="https://en.wikipedia.org/wiki/Secure_Hash_Algorithms">
    Secure Hash Algorithm</Link> with an output length of 256 bits. The
    output is usually encoded in hexadecimal notation as a string
    of 64 characters.
  </p>

  <p>
    An output of 256 bits means there are 2<sup>256</sup> possible output hashes.
  </p>

  <ToolCard title="Number of possible hashes"
            encoding-btn :encoding="encoding[activeEncoding]" v-on:rotate-encoding="rotateEncoding">
    <div class="list value pt-2">
      {{ hashMax[encoding[activeEncoding]] }}
    </div>
  </ToolCard>

  <p>
    For some context, it is estimated that there are ~10<sup>78</sup>
    <Link href="https://www.liverpoolmuseums.org.uk/stories/which-greater-number-of-atoms-universe-or-number-of-chess-moves">
     atoms in the observable universe</Link>.
    This means that every atom in the universe could have it's own SHA-256 hash!
  </p>

  <hr>

  <TldrCard>
    A hash can be interpreted as an absurdly large number.
  </TldrCard>

  <hr>

  <ToolCard title="SHA-256 Calculator"
            encoding-btn :encoding="encoding[activeEncoding]" v-on:rotate-encoding="rotateEncoding">
    <div class="list label">Input</div>
    <div class="list value">
      <b-input-group prepend="Data" size="sm">
        <b-form-input @keyup="updateHash" :value="data" size="sm"/>
      </b-input-group>
    </div>

    <div class="list label">Output Hash</div>
    <div class="list value">{{ hash[encoding[activeEncoding]] }}</div>
  </ToolCard>

  <hr>

  <p>
    For more details of how SHA-256 works watch this utter madman calculate
    round 1/64 of SHA-256 BY HAND!
  </p>

  <div style="width: 350px; margin-right: auto; margin-left: auto;">
    <b-card no-body>
      <Link href="https://www.youtube.com/embed/y3dqhixzGVo">
        <img class="img-card" src="/assets/mine_by_hand.webp" alt="thumbnail"/>
      </Link>
    </b-card>
  </div>
</Page>
</template>

<script>
import EncodingMixin from '@/mixins/EncodingMixin';
import InfoCard from '@/components/cards/InfoCard';
import Link from '@/components/Link';
import Num from '@/services/Num';
import Page from '@/components/Page.vue';
import TldrCard from '@/components/cards/TldrCard';
import ToolCard from '@/components/cards/ToolCard';
import { sha256dFromText } from '@/services/sha256_utils';

export default {
  mixins: [
    EncodingMixin
  ],
  components: {
    InfoCard,
    Link,
    Page,
    TldrCard,
    ToolCard
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
    }
  }
};
</script>
