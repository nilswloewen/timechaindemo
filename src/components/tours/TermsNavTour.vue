<template>
<Tour :name="name" :steps="steps" big-btn v-on:start-tour="startTour"/>
</template>

<script>
import Tour from '@/components/tours/Tour';

export default {
  components: { Tour },
  data() {
    return {
      name: 'terms_nav_tour',
      steps: [
        {
          target: '#terms_nav_tour_btn',
          content: 'Nice! Let\'s take a second to learn about navigating the site.',

        },
        {
          target: '#fp-nav',
          content: 'You can click on the dots on the right to jump between sections.',
          params: {
            placement: 'left',
          },
        },
        {
          target: '#terms_slide .nav_btn_wrapper',
          content: 'Use the "Prev" and "Next" buttons to move through each page.',
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
