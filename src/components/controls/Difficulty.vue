<template>
<b-card no-body>
  <b-card-header header-bg-variant="info">
    <b-icon-wrench/>
    Difficulty
  </b-card-header>

  <b-card-body class="text-center">
    <p>
      <b-button @click="$emit('calibrate-hps')" size="sm"> This Device</b-button>
      <b-button @click="$emit('show-antminer-hashrate')" size="sm"> Antminer S19j Pro</b-button>
      <b-button @click="$emit('show-global-hashrate')" size="sm"> Global</b-button>
    </p>

    <p>
      <b-input-group id="hashrate_picker" size="sm" append="H/s">
        <b-form-input id="hashrate_input" type="number" size="sm" step="1"
                      style="text-align: right;" :value="hashrate" :min="1" @change="updateHashrate"/>
        <b-form-select id="hashrate_units_select" size="sm" @change="updateHashrateUnit"
                       :value="hashrateUnit" :options="hashrateUnits"/>
      </b-input-group>
      {{ hashrateLong }}<sub>H/s</sub>
    </p>

    <p>
      Block Time: (Average time to find valid block)
    </p>

    <b-input-group id="time_picker">
      <b-form-input id="time_input" type="number" size="sm"
                    style="text-align: right;" :value="blocktime" :min="1" @change="updateBlockTime"/>
      <b-form-select id="time_units_select" size="sm" @change="updateBlocktimeUnit" :value="blocktimeUnit"
                     :options="blocktimeUnits"/>
    </b-input-group>
  </b-card-body>
</b-card>
</template>

<script>
export default {
  props: {
    hashrate: Number,
    hashrateLong: String,
    hashrateUnit: String,
    hashrateUnits: Array,
    blocktime: Number,
    blocktimeUnit: String,
    blocktimeUnits: Array,
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
  }
}
</script>

<style>
#time_input, #hashrate_input,
#time_units_select, #hashrate_units_select {
  width: 96px;
  max-width: 96px;
}
</style>
