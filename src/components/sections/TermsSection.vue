<template>
<div id="terms_section" class="section">
  <Page data-anchor="terms" first prev-section-btn slide>
    <h1>Terms</h1>

    <p>
      We must first understand a few concepts before we begin:
    </p>

    <p>
      Due to the technical nature of Bitcoin, there are some aspects of the system that look like
      gibberish to humans. The following pages will show that while this gibberish is not very
      human-readable, it is not non-sense.
    </p>
    <h4>Note:</h4>
    <p>
      There are many interactive elements in the following pages. If you are ever unsure of what to do,
      click the instructions icon <TourBtn id="terms_tour_btn" v-on:start-tour="startTour"/> for help. Heck,
      try it now just for kicks!
    </p>

    <v-tour :name="tour.name" :steps="tour.steps"/>
  </Page>

  <NotationSlide/>
  <HashFunctionsSlide/>
  <Sha256Slide/>
</div>
</template>

<script>
import Page from '@/components/Page.vue';
import HashFunctionsSlide from '@/components/sections/slides/HashFunctionsSlide.vue';
import NotationSlide from '@/components/sections/slides/NotationSlide.vue';
import Sha256Slide from '@/components/sections/slides/Sha256Slide.vue';
import TourBtn from '@/components/controls/TourBtn';

export default {
  components: {
    TourBtn,
    HashFunctionsSlide,
    NotationSlide,
    Page,
    Sha256Slide,
  },
  data() {
    return {
      tour: {
        name: 'terms_tour',
        steps: [
          {
            target: '#terms_tour_btn',
            content: 'Nice! Let\'s take a second to learn about navigating the site.',
            params: {
              enableScrolling: false
            }
          },
          {
            target: '#fp-nav',
            content: 'You can click on the dots on the right to jump between sections.',
            params: {
              enableScrolling: false,
              placement: 'left',
            }
          },
          {
            target: '#terms_slide .nav_btn_wrapper',
            content: 'Use the "Prev" and "Next" buttons to move through each page.',
            params: {
              enableScrolling: false
            }
          },

        ],
      }
    }
  },
  methods: {
    startTour() {
      this.$tours[this.tour.name].start()
    }
  }
};
</script>
