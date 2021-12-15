<template>

<span>
  <b-button v-if="bigBtn" :id="`${name}_btn`" class="tour_btn" size="lg">
    <b-icon-info-circle role="button" scale="1.5" @click="startTour"/>
  </b-button>

  <b-button v-else :id="`${name}_btn`" class="tour_btn" size="sm" @click="startTour">
    <b-icon-info-circle/>
  </b-button>
  <v-tour :name="name" :options="options" :steps="getSteps()"/>
</span>

</template>

<script>
export default {
  props: {
    bigBtn: Boolean,
    name: String,
    steps: Array,
  },
  data() {
    return {
      options: {
        labels: {
          buttonSkip: 'Skip',
          buttonPrevious: 'Prev',
          buttonNext: 'Next',
          buttonStop: 'End',
        },
      },
    };
  },
  methods: {
    startTour() {
      this.$emit('start-tour', this.name);
    },
    // Disable scrolling on all steps.
    getSteps() {
      this.steps.forEach((step) => {
        if (typeof step.params !== 'undefined') {
          step.params.enableScrolling = false;
          return;
        }
        step.params = { enableScrolling: false };
      });
      return this.steps;
    },
  },
};
</script>

<style>
.btn-secondary.tour_btn {
  background-color: transparent;
  border-color: gray;
  box-shadow: -2px 3px 5px 0 gray;
  margin-right: .5em;
}

.btn-secondary.tour_btn:focus {
  background-color: transparent;
}

.v-tour__target--highlighted {
  border: 1px solid white;
  box-shadow: 0 0 5px 3px white !important;
}

.v-tour,
.v-tour div {
  display: inline-block;
}

.v-step {
  min-width: 225px;
  box-shadow: -2px 3px 5px 0 white !important;
  background-color: rgba(0, 0, 0, 0.9) !important;
  border: 1px solid white !important;
  text-align: justify !important;
  line-height: 1.5em;
  font-weight: normal;
}

.v-step__buttons {
  text-align: center;
}

.v-step__button {
  margin: 0 0.5em !important;
  font-size: 0.875rem !important;
  box-shadow: -2px 3px 5px 0 gray !important;
}

.v-step__arrow {
  text-align: center;
  background-color: white !important;
}
</style>
