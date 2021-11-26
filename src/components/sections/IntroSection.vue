<template>
  <Page data-anchor="intro">

    <h1 class="text-center">
      Bitcoin Timechain
    </h1>

    <p>
      The goal of this demo is to show that Bitcoin is backed by not just it's massive computer network, but by time itself.
    </p>

    <p>
      Bitcoin mining is difficult not because it requires energy and computational
      power, but because it requires <b>time</b>.
    </p>

    <p>
      'Mining' is the process of recording transactions on the Bitcoin network.
      A successful miner is rewarded with newly minted bitcoin as a reward for their time and effort.
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
      type: Array,
    },
  },
  components: {
    Page,
    TableOfContents,
  },
};
</script>
