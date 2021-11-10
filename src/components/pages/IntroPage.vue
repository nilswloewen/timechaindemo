<template>
  <Page data-anchor="intro">

    <b-card header="Timechain Demo">
      <h4>How Bitcoin Mining Works</h4>

      <q>Bitcoin is time.</q> - <a href="https://dergigi.com/2021/01/14/bitcoin-is-time">derGigi</a>

      <TableOfContents :contents="contents"/>
    </b-card>

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
