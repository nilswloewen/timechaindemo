<template>
<Page data-anchor="intro" first last>
  <div class="fade-in">

    <h1>Timechain</h1>

    <p>
      <b>The timechain is the history of all bitcoin transactions ever made.</b> New transactions
      are added to the timechain with a game of probabilities called mining.
    </p>

    <p>
      Every 10 minutes there is a worldwide, winner-takes-all competition to see who can record
      new transactions onto the timechain first. The winner is rewarded with newly created
      bitcoin, plus the fees from all the transactions they just finalized.
    </p>

    <p>
      At the time of this writing, the reward is <b>~6.25 BTC</b>. This is valued around $300,000 USD.
      Yes, that's over a quarter-million dollars being given away every 10 minutes.
    </p>

    <p>
      This game is driven by self-interest, yet every participant ends up benefiting. The rules of the game
      are 100% transparent and cannot be changed. There is no referee; every participant double-checks
      the work of every other participant, cheaters are simply ignored.
    </p>

    <p>
      The real reward from mining is that everyone on the global Bitcoin network can now agree upon something.
      Isn't that a miracle! Even enemies can look at the shared timechain and say: "Yes, we have analysed
      the timechain and neither you nor I have cheated one another." <b>Mining creates an irrefutable, immutable,
      shared reality.</b>
    </p>

    <hr class="m-4">

    <h5 class="text-center">This demo will explain the rules of the game.</h5>

    <hr class="m-4">

    <p class="text-center">
      * This site works best on desktop and tablet devices. *
    </p>

    <TableOfContents :contents="table_of_contents"/>

    <div class="nav_btn_wrapper text-center mt-5">
      <a href="/terms">
        <b-button class="nav_btn next_section" size="sm">
          Begin
          <b-icon-arrow-down/>
        </b-button>
      </a>
    </div>

  </div>
</Page>
</template>

<script>
import TableOfContents from '@/components/controls/TableOfContents.vue';
import Page from '@/components/Page.vue';

export default {
  props: {
    contents: {
      type: Array,
    },
  },
  components: {
    Page,
    TableOfContents,
  },
  mounted() {
    this.addAnchorsToFullpage();
  },
  methods: {
    addAnchorsToFullpage() {
      this.table_of_contents.forEach((section) => {
        this.fullpageOptions.anchors.push(section.anchor);
        this.fullpageOptions.navigationTooltips.push(section.label);
      });
    },
  },
  data() {
    return {
      table_of_contents: [
        {anchor: 'intro', label: 'Intro'},
        {
          anchor: 'terms',
          label: 'Terms',
          slides: [
            {anchor: 'notation', label: 'Notation'},
            {anchor: 'hash_functions', label: 'Hash Functions'},
            {anchor: 'sha256', label: 'SHA-256'},
          ],
        },
        {
          anchor: 'blockchain',
          label: 'Blockchain',
          slides: [
            {anchor: 'simple_blockchain', label: 'Simple Example'},
          ],
        },
        {
          anchor: 'pow',
          label: 'Mining / Proof-of-Work',
          slides: [
            {anchor: 'target', label: 'Target'},
            {anchor: 'pow_blockchain', label: 'POW Blockchain'},
            {anchor: 'pow_mining', label: 'POW Mining'},
            {anchor: 'adjustable_target', label: 'POW Review'},
          ],
        },
        {
          anchor: 'timechain',
          label: 'Timechain',
          slides: [
            {anchor: 'difficulty_adjustment', label: 'Difficulty Adjustment'},
            {anchor: 'timechain_blockchain', label: 'Timechain'},
            {anchor: 'timechain_mining', label: 'Timechain Mining'},
            {anchor: 'real_world_hashrate', label: 'Real-World Hashrate'},
            {anchor: 'timechain_review', label: 'Timechain Review'},
          ],
        },
        {
          anchor: 'real_mining',
          label: 'Real Mining',
          slides: [
            {anchor: 'real_mining', label: 'Real Mining'},
          ],
        },
        {anchor: 'resources', label: 'Resources'},
      ],
    }
  }
};
</script>

<style>

.fade-in, #intro_section {
  animation: fadein 3s;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

#intro_section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/fractalSculpture.webp');
}
</style>
