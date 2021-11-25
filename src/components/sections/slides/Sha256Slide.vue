<template>
  <Page slide data-anchor="sha256" encoding-btn v-on:rotate-encoding="rotateEncoding" v-on:update-active-encoding="updateActiveEncoding">
    <h1>SHA-256</h1>
    <p>
      Bitcoin mining uses a particular hash function called SHA-256, which
      means <a href="https://en.wikipedia.org/wiki/Secure_Hash_Algorithms">
      Secure Hash Algorithm</a> with an output length of 256 bits. The
      output is usually encoded in hexadecimal notation as a string
      of 64 characters.
    </p>

    <p>
      An output of 256 bits means there are 2<sup>256</sup>-1 possible output values.
      If interpreted as a number, the maximum value of a hash is also the number of possible values.
    </p>

    <b-card no-body>
      <b-list-group-item class="list-field">Max value</b-list-group-item>
      <b-list-group-item class="list-value">
        {{ hashMax[encoding[activeEncoding]] }}
      </b-list-group-item>
    </b-card>

    <p>
      For some context, it is estimated that there are 10<sup>78</sup> to
      10<sup>82</sup>
      <a href="https://www.liverpoolmuseums.org.uk/stories/which-greater-number-of-atoms-universe-or-number-of-chess-moves">atoms in the observable universe</a>.
    </p>

    <p>
      It is theoretically possible for two inputs or more to have the same hash output. However,
      because of the massive possible values, this is infinitesimally unlikely to occur, and currently
      unfeasible to do on purpose.
    </p>

    <b-card no-body class="mt-4">
      <b-card-header header-bg-variant="info">
        <span class="float-left"><b-icon-wrench/> SHA-256 Calculator</span>
        <b-icon-info-circle class="float-right" v-b-toggle.collapse_note/>
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

    <p>
      For more details of how SHA-256 works watch this utter maniac calculate
      round 1/64 of SHA-256 BY HAND!
    </p>

    <div style="width: 350px; margin-right: auto; margin-left: auto;">
      <b-card no-body>
        <iframe width="auto" height="197px" src="https://www.youtube.com/embed/y3dqhixzGVo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>
      </b-card>
    </div>
  </Page>
</template>

<script>
import Page from '@/components/Page.vue';
import { sha256dFromText } from '@/services/sha256_utils';
import Num from '@/services/Num';

export default {
  components: {
    Page,
  },
  data() {
    return {
      data: 'Try changing this data...',
      hash: { hexadecimal: '60759d1ab05baf2c79e281d8fbff268f559328dc45bd46b12114bbbe40197271' },
      hashMax: new Num(BigInt(`0x${''.padEnd(64, 'f')}`), 64),

    };
  },
  async mounted() {
    const hash = await sha256dFromText(this.data);
    this.hash = new Num(BigInt(`0x${hash}`));
  },
  methods: {
    async updateHash(event) {
      this.data = event.target.value;
      const hash = await sha256dFromText(this.data);
      this.hash = new Num(BigInt(`0x${hash}`));
    },
  },
};
</script>
