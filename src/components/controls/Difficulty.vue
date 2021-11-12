<template>
  <b-card no-body>
    <b-card-header>
      Difficulty
    </b-card-header>
    <p><q>In other words, the difficulty-adjustment is about keeping a constant time, not a constant level of security, difficulty, or energy expenditure.</q>- DerGigi</p>
    <b-card-body>
      <div>
        This device can calculate <b>~{{ hpsOfThisDevice.toFixed(0) }}</b> Hashes per Second
        <b-button @click="$emit('calibrate-hps')">Calibrate</b-button>
      </div>
      <div>Average number of hashes: {{ avgHashes }}</div>

      <div>Average time to find valid block: {{avgTime}} Seconds</div>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  props: {
    avgHashes: Number,
    hpsOfThisDevice: Number,
  },
  data() {
    return {
      avgTime: 0,
    };
  },
  mounted() {
    this.calcAvgTime();
  },
  watch: {
    hpsOfThisDevice() {
      this.calcAvgTime();
    },
  },
  methods: {
    calcAvgTime() {
      const avgSeconds = (1 / this.hpsOfThisDevice) * this.avgHashes;
      this.avgTime = avgSeconds.toFixed(2);
    },
  },
};
</script>
