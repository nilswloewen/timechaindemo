<template>
  <b-card no-body>
    <b-card-header header-bg-variant="info">
      <b-icon-wrench/> Difficulty
    </b-card-header>

    <b-card-body class="text-center">
      <p>
        This device can calculate <b>~{{ hpsOfThisDevice.toFixed(0) }}</b><sub>H/s</sub>
        <b-button @click="$emit('calibrate-hps')" size="sm"><b-icon-wrench/></b-button>
      </p>

      <p>
        Average time to find valid block:
      </p>

      <b-input-group id="time_picker" class="d-inline-block">
        <b-form-input id="time_input" type="number" size="sm"
                      style="text-align: right;" :value="time" @change="updateTime"/>
        <b-form-select id="time_units_select" size="sm" v-model="timeUnit" :options="timeUnits"/>
      </b-input-group>
    </b-card-body>

    <!--    <b-list-group-item class="list-field">Hash Max {{ hexDigits }}</b-list-group-item>-->
    <!--    <b-list-group-item class="list-value">-->
    <!--      <b-input-group prepend="hexDigits Min 2" append="Max 64" size="sm">-->
    <!--        <b-form-input :title="hexDigits" type="range" size="sm" :min="2" :max="64" step="1"-->
    <!--                      :value="hexDigits" @change="updateHexDigits"/>-->
    <!--      </b-input-group>-->
    <!--      {{ hashMax[localEncoding] }}-->
    <!--    </b-list-group-item>-->

    <!--    <b-list-group-item class="list-field">Difficulty</b-list-group-item>-->
    <!--    <b-list-group-item class="list-value"> {{ difficulty }} </b-list-group-item>-->
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
      time: 30,
      timeUnit: 'Seconds',
      timeUnits: ['Seconds', 'Minutes', 'Hours', 'Days', 'Weeks', 'Months', 'Years']
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
    updateTime(newTime) {
      this.time = Number(newTime);
    },

    calcAvgTime() {
      const seconds = Math.ceil((1 / this.hpsOfThisDevice) * this.avgHashes);
      this.avgTime = seconds;
    },

    secondsToTime(seconds) {
      const minute = 60;
      if (seconds < minute) {
        return { val: seconds, unit: 'Seconds' };
      }

      const hour = minute * 60;
      if (seconds < hour) {
        return { val: Math.floor(seconds / minute), unit: 'Minutes' };
      }

      const day = hour * 24;
      if (seconds < day) {
        return { val: Math.floor(seconds / hour), unit: 'Minutes' };
      }

      const week = day * 7;
      if (seconds < week) {
        return { val: Math.floor(seconds / day), unit: 'Days' };
      }

      const month = day * 30;
      if (seconds < month) {
        return { val: Math.floor(seconds / week), unit: 'Weeks' };
      }

      const year = day * 365;
      if (seconds < year) {
        return { val: Math.floor(seconds / month), unit: 'Months' };
      }

      const years = Math.floor(seconds / year);
      if (years < 1_000_000_000) {
        return { val: years.toLocaleString('en-US'), unit: 'Years' };
      }
      return { val: years.toExponential(2), unit: 'Years' };
    },

    updateHexDigits(newHexDigits) {
      this.hexDigits = Number(newHexDigits);
      this.$emit('update-hex-digits', this.hexDigits);
    },
  },
};
</script>
<style>
  #time_picker {
    display: inline-block;
  }
  #time_input,
  #time_units_select {
    display: inline;
    width: 96px;
    max-width: 96px;
  }
</style>
