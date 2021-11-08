<template>
  <b-card no-body>
    <b-card-header>
      Difficulty
    </b-card-header>
    <b-card-body>
      <div>
        This device can calculate <b>~{{ hpsOfThisDevice.toFixed(0) }}</b> Hashes per Second
      </div>
      <div>Average number of tries: {{avgNumTries}}</div>

      <div>Average number of seconds to find valid block: </div>
      <b-form-input type="number" v-model="avgTime"/>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  props: {
    hpsOfThisDevice: Number,
  },
  data() {
    return {
      avgNumTries: 0,
      avgTime: 3,
    };
  },
  watch: {
    avgTime() {
      this.avgTime = 0;
    },
    hpsOfThisDevice() {
      this.avgTime = 3;
    },
  },

};
</script>
