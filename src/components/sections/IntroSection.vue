<template>
<Page data-anchor="intro">

  <h1 class="fade-in">
    Bitcoin Timechain Demo
  </h1>

  <p class="fade-in">
    Bitcoin is backed by not just it's massive computer network, but by time
    itself. The demo will start with underlying concepts such as hash functions and move on to show
    blockchain, proof-of-work, mining, and the difficulty-adjustment that regulates the timechain.
  </p>

  <TableOfContents class="fade-in" :contents="contents"/>
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
  from { opacity: 0; }
  to   { opacity: 1; }
}
</style>
