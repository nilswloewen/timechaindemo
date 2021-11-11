<template>
  <div class="section">
    <Page slide data-anchor="timechain">
      <h1>Timechain</h1>
    </Page>

    <Page slide data-anchor="difficulty">
      <h1>Difficulty</h1>
      <Difficulty/>
    </Page>

    <Page slide data-anchor="hash_rate">
      <h1>Hash Rate</h1>
    </Page>
  </div>
</template>

<script>
import Page from '@/components/pages/Page.vue';
import Difficulty from '@/components/controls/Difficulty.vue';

export default {
  components: {
    Difficulty,
    Page,
  },
};
</script>
