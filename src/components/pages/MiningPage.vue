<template>
  <Page data-anchor="mining">

    <h1>Mining</h1>

    <Algorithm/>
  </Page>
</template>

<script>
import Page from '@/components/pages/Page.vue';
import Algorithm from '@/components/cards/Algorithm.vue';

export default {
  components: {
    Algorithm,
    Page,
  },
};
</script>
