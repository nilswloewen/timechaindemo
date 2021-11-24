<template>
  <Page data-anchor="intro">

    <h1 class="text-center">
      Bitcoin Timechain
    </h1>

    <p>
      Welcome to an interactive demo of what it means to 'mine' Bitcoin.
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

<style>
  /*[data-anchor="intro"] {*/
  /*  background-image: url("/assets/brain_black.webp");*/
  /*  background-repeat: no-repeat;*/
  /*  background-size: cover;*/
  /*  background-position: center center;*/
  /*}*/
  /*.fade-in {*/
  /*  animation-name: FadeIn;*/
  /*  animation-duration: 4s;*/
  /*  transition-timing-function: ease-in;*/
  /*  opacity: 1;*/
  /*}*/
  /*.delay-fade {*/
  /*  animation-delay: 1s;*/
  /*}*/

  /*@keyframes FadeIn {*/
  /*  0% {*/
  /*    opacity: 0;*/
  /*  }*/
  /*  100% {*/
  /*    opacity: 1;*/
  /*  }*/
  /*}*/
</style>
