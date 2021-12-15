<template>
<Tour :name="name" :steps="steps" big-btn v-on:start-tour="startTour"/>
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
          target: '#simple_block_0 .hash_value',
          content: 'Before we begin, make a mental note of hash of Block #2.',
          params: { highlight: true },
        },
        {
          target: '#simple_block_0',
          content: 'If we change either the <b>Data</b> or <b>Previous Block Hash</b> of this block, its hash will change.',
          params: { placement: 'top' },
        },
        {
          target: '#simple_block_0 input',
          content: 'Let\'s change the amount of bitcoin that was sent.',
        },
        {
          target: '#simple_block_0 input',
          content: 'See how the hash has changed?',
          before: () => {
            const input = document.querySelector('#simple_block_0 input');
            input.value = input.value.replace(/\d{1,2}₿/g, '');
            input.value = input.value + '999₿';
            input.dispatchEvent(new KeyboardEvent('keyup'));
          },
        },
        {
          target: '#simple_block_0 .prev_block_hash',
          content: 'Now let\'s change the <b>Previous Block Hash</b> by changing the data of the previous block.',
          params: { highlight: true },
        },
        {
          target: '#simple_block_1 input',
          content: 'Let\'s change the amount of bitcoin that was sent in Block #1',
        },
        {
          target: '#simple_block_1 input',
          content: 'See how the hash has changed?',
          before: () => {
            const input = document.querySelector('#simple_block_1 input');
            input.value = input.value.replace(/\d{1,2}₿/g, '');
            input.value = input.value + '999₿';
            input.dispatchEvent(new KeyboardEvent('keyup'));
          },
        },
        {
          target: '#simple_block_0 .hash_value',
          content: 'Because these blocks are linked together, any change in an old block is reflected in the newer ones.',
          params: { highlight: true },
        },
        {
          target: '.add_block_btn',
          content: 'Try adding a few more blocks and experimenting a bit before you move on.',
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
