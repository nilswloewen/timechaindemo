<template>
<Page data-anchor="intro">
  <div class="fade-in">

    <h1> Bitcoin Timechain Demo </h1>

    <p>
      Welcome to the Timechain Demo 0.1!
    </p>

    <p>
      If you have ever wondered what Bitcoin 'Mining' actually entails, or if you have heard that Bitcoin
      is backed by Math but don't really know what that means, then you've come to the right place!
    </p>

    <p>
      The goal of this demo is to show that Bitcoin is backed by a game of probabilities called mining.
      The demo will start with underlying concepts such as hash functions and move on to show
      blockchain, proof-of-work, mining, and the difficulty-adjustment that regulates the timechain.
    </p>

    <p>
      This demo explores ideas that are relevant to inner-workings of many crypto-currencies, but is focused on the
      OG King &mdash; BTC.
    </p>

    <TableOfContents :contents="contents"/>
  </div>
</Page>
</template>

<script>
import Page from '@/components/Page.vue';
import TableOfContents from '@/components/controls/TableOfContents.vue';

export default {
  props: {
    contents: {
      type: Array
    }
  },
  components: {
    Page,
    TableOfContents
  }
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
</style>
