<template>
  <Page slide data-anchor="sha256" fp_bg>
    <h1>SHA-256</h1>
    <p>
      Bitcoin mining uses a particular hash function called SHA-256, which
      means <a href="https://en.wikipedia.org/wiki/Secure_Hash_Algorithms">
      Secure Hash Algorithm</a> with an output length of 256 bits. The
      output is usually encoded in hexadecimal notation as a string
      of 64 characters.
    </p>

    <p>
      In this demo all hashes are calculated as double SHA-256 or sha256d,
      exactly as bitcoin-core does it.
    </p>
    <p>swapEndian( sha256( sha256( data ) ) )</p>

    <b-card no-body>
      <b-card-header header-bg-variant="info"> <b-icon-wrench/> SHA-256 Calculator </b-card-header>

      <b-list-group-item class="list-field">Input</b-list-group-item>
      <b-list-group-item class="list-value">
        <b-input-group prepend="Data" size="sm">
          <b-form-input @keyup="updateHash" :value="data" size="sm"/>
        </b-input-group>
      </b-list-group-item>

      <b-list-group-item class="list-field">Output Hash</b-list-group-item>
      <b-list-group-item class="list-value">{{ hash }}</b-list-group-item>
    </b-card>

    <p>
      For more details of how SHA-256 works watch this utter maniac calculate
      round 1/64 of SHA-256 BY HAND!
    </p>

    <div class="text-center">
      <iframe width="350px" height="197px" style="margin-right: auto; margin-left: auto;" src="https://www.youtube.com/embed/y3dqhixzGVo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>
    </div>
  </Page>
</template>

<script>
import Page from '@/components/Page.vue';
import { sha256dFromText } from '@/services/sha256_utils';

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
