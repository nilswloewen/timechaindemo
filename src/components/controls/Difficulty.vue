<template>
  <b-card no-body>
    <b-card-header>
      Difficulty
    </b-card-header>
    <b-card-body>
      <p>
        <q>In other words, the difficulty-adjustment is about keeping a constant
          time, not a constant level of security, difficulty, or energy expenditure.</q>
        - DerGigi
      </p>
      <div>
        This device can calculate <b>~{{ hpsOfThisDevice.toFixed(0) }}</b> Hashes per Second
        <b-button @click="$emit('calibrate-hps')">Calibrate</b-button>
      </div>
      <div>Average number of hashes: {{ avgHashes }}</div>

      <div>Average time to find valid block: {{avgTime}} Seconds</div>
    </b-card-body>

    <b-input-group prepend="hexDigits Min 2" append="Max 64" size="sm">
      <b-form-input :title="hexDigits" type="range" size="sm" :min="2" :max="64"
                    :value="hexDigits" @change="updateHexDigits"/>
    </b-input-group>
  </b-card>
</template>

<script>
export default {
  props: {
    avgHashes: null,
    hpsOfThisDevice: Number,
  },
  data() {
    return {
      avgTime: 0,
      hexDigits: 2,
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
    updateHexDigits(newLimit) {
      this.hexDigits = Number(newLimit);
      this.$emit('update-hex-digits', this.hexDigits);
    },
  },
};
</script>
