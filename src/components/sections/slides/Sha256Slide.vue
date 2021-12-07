<template>
<Page slide data-anchor="sha256">
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

  <ToolCard title="Number of possible hashes"
            encoding-btn :encoding="encoding[activeEncoding]" v-on:rotate-encoding="rotateEncoding">
    <div class="list value pt-2">
      {{ hashMax[encoding[activeEncoding]] }}
    </div>
  </ToolCard>

  <p>
    For some context, it is estimated that there are
    <a
      href="https://www.liverpoolmuseums.org.uk/stories/which-greater-number-of-atoms-universe-or-number-of-chess-moves">
      ~10<sup>78</sup> atoms in the observable universe</a>.
    This means that every atom in the universe could have it's own SHA-256 hash!
  </p>

  <hr>

  <TldrCard>
    A hash is an absurdly large number which makes the math really hard &mdash; which is why people trust it.
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
    <b-card no-body class="img_card">
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
import InfoCard from '@/components/cards/InfoCard';
import ToolCard from '@/components/cards/ToolCard';
import TldrCard from '@/components/cards/TldrCard';

export default {
  mixins: [
    EncodingMixin
  ],
  components: {
    TldrCard,
    InfoCard,
    Page,
    ToolCard
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
