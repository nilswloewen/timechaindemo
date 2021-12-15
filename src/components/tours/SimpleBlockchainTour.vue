<template>
<Tour big-btn :name="name" :steps="steps" v-on:start-tour="startTour"/>
</template>

<script>
import Tour from '@/components/tours/Tour';

export default {
  components: { Tour },
  data() {
    return {
      name: 'simple_blockchain_tour',
      steps: [
        {
          target: '.add_block_btn',
          content: 'Add 3 blocks.',
        },
      ],
    };
  },
  methods: {
    startTour() {
      this.$tours[this.name].start();
    },
  },
};
</script>
