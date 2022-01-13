<template>
<Tour :name="name" :steps="steps" v-on:start-tour="startTour"/>
</template>

<script>
import Tour from '@/components/tours/Tour';

export default {
  components: { Tour },
  data() {
    return {
      name: 'pow_mining_tour',
      steps: [
        {
          target: '#pow_mining_controls input',
          content: 'In the process of mining the <b>Data</b> of the block is never changed. Instead, we will change the <b>Nonce</b> as we search for a valid hash.',
        },
        {
          target: '#pow_mining_controls input',
          content: 'Remember, the <b>Nonce</b> is just a random number. 42069 is as good a place as any to start.',
        },
        {
          target: '#pow_mining_controls input',
          content: 'Fail! This new nonce has produced a hash of 067, which is not lower than the target. Please play again!',
          before: () => {
            const input = document.querySelector('#pow_mining_controls input');
            input.value = '42069';
            input.dispatchEvent(new Event('change'));
          },
        },
        {
          target: '#pow_mining_controls .inc_nonce_btn',
          content: 'It\'ll be faster to mash this button to simply increment the nonce every try. Good luck bucko!',
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
