<template>
<Page data-anchor="intro" first last next-section-btn>
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
      This game is driven by greed, yet every participant ends up benefiting. The rules of the game
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

    <TableOfContents :contents="contents"/>
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
};
</script>

<style>
.fade-in {
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
