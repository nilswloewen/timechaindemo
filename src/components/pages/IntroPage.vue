<template>
  <Page data-anchor="intro">

    <h3>Timechain</h3>
    <h4>How Bitcoin Mining Works</h4>

    <q>Bitcoin is time.</q> - <a href="https://dergigi.com/2021/01/14/bitcoin-is-time">derGigi</a>

    <TableOfContents :contents="contents"/>

  </Page>
</template>

<script>
import Page from '@/components/pages/Page.vue';
import TableOfContents from '@/components/TableOfContents.vue';

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
