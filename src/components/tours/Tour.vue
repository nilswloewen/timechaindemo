<template>
<span>
  <b-button :id="`${name}_btn`" class="tour_btn" size="sm" @click="startTour">
    <b-icon-info-circle/>
  </b-button>
  <v-tour :name="name" :options="options" :steps="steps"/>
</span>
</template>

<script>
export default {
  props: {
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
  },
};
</script>
