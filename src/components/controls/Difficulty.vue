<template>
<ToolCard title="Difficulty">

  <b-card-body class="text-center">
    <b-button v-if="showCalibrateBtn" class="m-2" size="sm" variant="primary" @click="$emit('calibrate-hps')">
      Calibrate for your device
    </b-button>

    <div v-if="showHashratePicker">
      <div class="hashrate_wrapper">
        <b-input-group id="hashrate_picker" append="H/s" size="sm">
          <b-form-input id="hashrate_input" :min="1" :value="hashrate.toFixed(0)" size="sm"
                        step="1" style="text-align: right;"
                        type="number" @change="updateHashrate"/>
          <b-form-select id="hashrate_units_select" :options="hashrateUnits" :value="hashrateUnit"
                         size="sm" @change="updateHashrateUnit"/>
        </b-input-group>
      </div>
    </div>

    <div class="mt-2">
      <b-icon-arrow-clockwise v-if="isCalibrating" animation="spin" size="sm"/>
      <template v-else>
        {{ hashrateLong }}<sub>H/s</sub>
      </template>
    </div>

    <hr>
    <div class="mb-2">
      Block Time: (Average time to find valid block)
    </div>

    <div v-if="showGlobal" class="blocktime_wrapper">
      <b-input-group id="time_picker">
        <b-form-input id="time_input" :min="1" :value="blocktime"
                      size="sm" style="text-align: right;" type="number" @change="updateBlockTime"/>
        <b-form-select id="time_units_select" :options="blocktimeUnits" :value="blocktimeUnit" size="sm"
                       @change="updateBlocktimeUnit"/>
      </b-input-group>
    </div>
    <div v-else>
      {{ blocktime }} {{ blocktimeUnit }}
    </div>

  </b-card-body>
</ToolCard>
</template>

<script>
import ToolCard from '@/components/cards/ToolCard';

export default {
  components: {
    ToolCard,
  },
  props: {
    blocktime: Number,
    blocktimeUnit: String,
    blocktimeUnits: Array,
    hashrate: Number,
    hashrateLong: String,
    hashrateUnit: String,
    hashrateUnits: Array,
    isCalibrating: Boolean,
    showGlobal: Boolean,
    showHashratePicker: Boolean,
    showCalibrateBtn: Boolean,
  },
  methods: {
    updateHashrate(newHashrate) {
      this.$emit('update-hashrate', newHashrate);
    },
    updateHashrateUnit(newHashrateUnit) {
      this.$emit('update-hashrate-unit', newHashrateUnit);
    },
    updateBlockTime(newBlocktime) {
      this.$emit('update-blocktime', newBlocktime);
    },
    updateBlocktimeUnit(newBlocktimeUnit) {
      this.$emit('update-blocktime-unit', newBlocktimeUnit);
    },
  },
};
</script>

<style>
#time_input, #hashrate_input,
#hashrate_units_select {
  width: 80px;
  max-width: 80px;
}

.hashrate_wrapper,
.blocktime_wrapper {
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
}
</style>
