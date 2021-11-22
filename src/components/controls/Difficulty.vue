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

      <p>
        Average number of hashes to find valid block:
        ~{{ Math.ceil(avgHashes).toLocaleString('en-US') }}
      </p>

      <p>Average time to find valid block: ~{{ avgTime }} </p>
    </b-card-body>

    <b-list-group-item class="list-field">Block Time</b-list-group-item>
    <b-list-group-item class="list-value">
      <b-input-group prepend="Min 1" append="Max 20" size="sm">
        <b-form-input :title="blockTime" type="range" size="sm" :min="1" :max="20" step="1"
                      :value="blockTime" @change="updateBlockTime"/>
      </b-input-group>
    </b-list-group-item>

    <b-list-group-item class="list-field">Hash Max {{ hexDigits }}</b-list-group-item>
    <b-list-group-item class="list-value">
      <b-input-group prepend="hexDigits Min 2" append="Max 64" size="sm">
        <b-form-input :title="hexDigits" type="range" size="sm" :min="2" :max="64" step="1"
                      :value="hexDigits" @change="updateHexDigits"/>
      </b-input-group>
      {{ hashMax[localEncoding] }}
    </b-list-group-item>

    <b-list-group-item class="list-field">Difficulty</b-list-group-item>
    <b-list-group-item class="list-value"> {{ difficulty }} </b-list-group-item>

  </b-card>
</template>

<script>
export default {
  props: {
    avgHashes: null,
    difficulty: Number,
    hashMax: null,
    hpsOfThisDevice: Number,
    localEncoding: String,
  },
  data() {
    return {
      avgTime: 0,
      hexDigits: 2,
      blockTime: 10,
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
    updateBlockTime(newTime) {
      this.blockTime = Number(newTime);
    },
    calcAvgTime() {
      const seconds = Math.ceil((1 / this.hpsOfThisDevice) * this.avgHashes);
      this.avgTime = this.secondsToTime(seconds);
    },
    secondsToTime(seconds) {
      const minute = 60;
      if (seconds < minute) {
        return `${seconds} Seconds`;
      }

      const hour = minute * 60;
      if (seconds < hour) {
        return `${Math.floor(seconds / minute)} Minutes`;
      }

      const day = hour * 24;
      if (seconds < day) {
        return `${Math.floor(seconds / hour)} Hours`;
      }

      const week = day * 7;
      if (seconds < week) {
        return `${Math.floor(seconds / day)} Days`;
      }

      const month = day * 30;
      if (seconds < month) {
        return `${Math.floor(seconds / week)} Weeks`;
      }

      const year = day * 365;
      if (seconds < year) {
        return `${Math.floor(seconds / month)} Months`;
      }

      const years = Math.floor(seconds / year);
      if (years < 1_000_000_000) {
        return `${years.toLocaleString('en-US')} Years`;
      }
      return `${years.toExponential(2)} Years`;
    },
    updateHexDigits(newHexDigits) {
      this.hexDigits = Number(newHexDigits);
      this.$emit('update-hex-digits', this.hexDigits);
    },
  },
};
</script>
