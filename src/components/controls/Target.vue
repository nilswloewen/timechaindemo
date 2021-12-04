<template>
<b-card no-body class="target">
  <b-card-header header-bg-variant="info">
    <b-icon-wrench/> Target
    <b-button class="rotate_encoding_btn float-right" @click="$emit('rotate-encoding')" size="sm">
      <b-icon-vector-pen/>
    </b-button>
  </b-card-header>

  <b-list-group-item class="list-value pt-2" style="direction: rtl;"> {{ target[localEncoding] }}</b-list-group-item>

  <b-input-group v-if="!hideRange" prepend="Min 1" size="sm" append="Max" style="border-radius: 0;">
    <b-form-input :title="target[localEncoding]" :value="target.num" @change="onTargetChange" type="range"
                  min="1" :max="hashMax.num" size="sm"/>
  </b-input-group>

  <b-list-group-item class="list-field">Max</b-list-group-item>
  <b-list-group-item class="list-value" style="direction: rtl;">{{ this.hashMax[localEncoding] }}</b-list-group-item>

  <b-list-group-item class="list-field">
    Probability (Only of x% of possible hashes will be accepted).
  </b-list-group-item>
  <b-list-group-item class="list-value"> ~{{ getProbability }}%</b-list-group-item>

  <b-list-group-item class="list-field">Odds</b-list-group-item>
  <b-list-group-item class="list-value">
    {{ getNumerator }} out of {{ getDenominator }}
  </b-list-group-item>

  <b-list-group-item class="list-field">Average number of tries</b-list-group-item>
  <b-list-group-item class="list-value"> ~{{ Number(avgHashes.toFixed(0)).toLocaleString() }}</b-list-group-item>
</b-card>
</template>

<script>
import Num from '@/services/Num';

export default {
  props: {
    avgHashes: null,
    denominator: null,
    localEncoding: String,
    numerator: null,
    hideRange: Boolean,
    probability: null,
    target: Num,
    targetMax: Num,
    hashMax: Num
  },
  computed: {
    getProbability() {
      const percentage = this.probability * 100;
      if (percentage < 1) {
        // Ugly!
        const exp = percentage.toExponential();
        const powers = exp.substr(exp.indexOf('e') + 2, exp.length);
        return percentage.toFixed(Number(powers));
      }
      return percentage.toFixed(2);
    },
    getNumerator() {
      if (this.numerator > 1_000_000n) {
        return Number(this.numerator).toExponential(2);
      }
      return this.numerator.toLocaleString('en-US');
    },
    getDenominator() {
      if (this.denominator > 1_000_000n) {
        return Number(this.denominator).toExponential(2);
      }
      return this.denominator.toLocaleString('en-US');
    }
  },
  methods: {
    onTargetChange(newTarget) {
      this.$emit('updateTarget', new Num(BigInt(Number(newTarget)), this.hexDigits));
    }
  }
};
</script>

<style>
.target .list-field,
.target .list-value {
  text-align: left;
}
</style>
