<template>
  <b-card no-body>
    <b-card-header>
      Difficulty
    </b-card-header>
    <b-card-body>
      <p>
        This device can calculate <b>~{{ hpsOfThisDevice.toFixed(0) }}</b> Hashes per Second
        <b-button @click="$emit('calibrate-hps')" size="sm">Calibrate</b-button>
      </p>

      <p>Average number of hashes to find valid block: ~{{ avgHashes.toLocaleString('en-US') }}</p>

      <p>Average time to find valid block: {{ avgTime }} </p>
    </b-card-body>

    <b-input-group prepend="hexDigits Min 2" append="Max 64" size="sm">
      <b-form-input :title="hexDigits" type="range" size="sm" :min="2" :max="64" step="1"
                    :value="hexDigits" @change="updateHexDigits"/>
    </b-input-group>
    {{ difficulty }}
  </b-card>
</template>

<script>
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)

export default {
  props: {
    avgHashes: null,
    hpsOfThisDevice: Number,
    difficulty: Number,
  },
  data() {
    return {
      avgTime: 0,
      hexDigits: 2,
    };
  },
  mounted() {
    this.$emit('calibrate-hps');
    this.calcAvgTime();
  },
  watch: {
    avgHashes() {
      this.calcAvgTime();
    },
    hpsOfThisDevice() {
      this.calcAvgTime();
    },
  },
  methods: {
    calcAvgTime() {
      const timeAgo = new TimeAgo('en-US')

      const seconds = ((1 / this.hpsOfThisDevice) * this.avgHashes).toFixed(0);
      console.log(`\nSeconds: ${seconds}`);
      const now = new Date().getTime() / 1000;

      console.log(now);

      // Seconds
      // Minutes
      // Hours
      // Days
      // Weeks
      // Months
      // Years
      // Decades
      // Centuries
      // Millenia

      this.avgTime = timeAgo.format((now + seconds) * 1000, {now: 0, future: true});
    },
    updateHexDigits(newHexDigits) {
      this.hexDigits = Number(newHexDigits);
      this.$emit('update-hex-digits', this.hexDigits);
    },
  },
};
</script>
