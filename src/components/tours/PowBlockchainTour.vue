<template>
<Tour :name="name" :steps="steps" big-btn v-on:start-tour="startTour"/>
</template>

<script>
import Tour from '@/components/tours/Tour';

export default {
  components: { Tour },
  data() {
    return {
      name: 'pow_blockchain_tour',
      steps: [
        {
          target: '#pow_block_0 .hash_value',
          content: 'This hash is outlined in red because it is invalid! The new rules are that the block hash must be less than the target to be considered valid.',
          params: { highlight: true },
        },
        {
          target: '#pow_block_0 .hash_value',
          content: 'Click on the invalid hash to start mining this block.',
          params: { highlight: true },
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
