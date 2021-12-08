<template>
<ToolCard title="Difficulty">

  <b-card-body class="text-center">
    <b-button @click="$emit('calibrate-hps')" size="sm" class="m-2">
      Calibrate for your device
    </b-button>

    <div v-if="showGlobal">
      <p>
        <b-button @click="$emit('show-global-hashrate')" size="sm"> Global Hashrate </b-button>
      </p>

      <div class="hashrate_wrapper">
        <b-input-group id="hashrate_picker" size="sm" append="hashes per second">
          <b-form-input id="hashrate_input" type="number" :min="1" step="1"
                        style="text-align: right;" size="sm"
                        :value="hashrate.toFixed(0)" @change="updateHashrate"/>
          <b-form-select id="hashrate_units_select" size="sm" @change="updateHashrateUnit"
                         :value="hashrateUnit" :options="hashrateUnits"/>
        </b-input-group>
      </div>
    </div>

    <div class="mt-2">
      {{ hashrateLong }}<sub>H/s</sub>
    </div>

    <hr>
    <div class="mb-2">
      Block Time: (Average time to find valid block)
    </div>

    <div v-if="showGlobal" class="blocktime_wrapper">
      <b-input-group id="time_picker">
        <b-form-input id="time_input" type="number" size="sm"
                      style="text-align: right;" :value="blocktime" :min="1" @change="updateBlockTime"/>
        <b-form-select id="time_units_select" size="sm" @change="updateBlocktimeUnit" :value="blocktimeUnit"
                       :options="blocktimeUnits"/>
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
    ToolCard
  },
  props: {
    blocktime: Number,
    blocktimeUnit: String,
    blocktimeUnits: Array,
    hashrate: Number,
    hashrateLong: String,
    hashrateUnit: String,
    hashrateUnits: Array,
    showGlobal: Boolean,
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
    }
  }
};
</script>

<style>
#time_input, #hashrate_input,
#time_units_select, #hashrate_units_select {
  width: 96px;
  max-width: 96px;
}

.hashrate_wrapper,
.blocktime_wrapper {
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
}
</style>
