<template>
<Tour :name="name" :steps="steps" v-on:start-tour="startTour"/>
</template>

<script>
import Tour from '@/components/tours/Tour';

export default {
  components: { Tour },
  data() {
    return {
      name: 'sha256_tour',
      steps: [
        {
          target: '#sha256_calc_card .start_of_hash',
          content: 'Before making any changes, make a mental note of the start of the hash "607".',
          params: {
            highlight: true,
          },
          before: () => {
            // Reset input to original.
            const input = document.getElementById('sha_calc_input');
            input.value = 'Try changing this data...';
            input.dispatchEvent(new KeyboardEvent('keyup'));
          },
        },
        {
          target: '#sha_calc_input',
          content: 'If we make even the smallest changes to the input, the entire output hash will change. Watch the hash as one period is removed.',
        },
        {
          target: '#sha256_calc_card .start_of_hash',
          content: 'The start of the hash is now "3a7".',
          params: {
            highlight: true,
          },
          before: () => {
            const input = document.getElementById('sha_calc_input');
            input.value = 'Try changing this data..';
            input.dispatchEvent(new KeyboardEvent('keyup'));
          },
        },
        {
          target: '#sha_calc_input',
          content: 'This change is not random, if we revert the input back to the original, we should get the same hash.',
        },
        {
          target: '#sha256_calc_card .start_of_hash',
          content: 'Because the input data is now the same as when we started, the start of the hash is now back to "607".',
          params: {
            highlight: true,
          },
          before: () => {
            // Reset input to original.
            const input = document.getElementById('sha_calc_input');
            input.value = 'Try changing this data...';
            input.dispatchEvent(new KeyboardEvent('keyup'));
          },
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
