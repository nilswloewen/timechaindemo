<template>
<ToolCard title="Target" :header-addon="target[localEncoding]"
          encoding-btn v-on:rotate-encoding="$emit('rotate-encoding')">

  <b-input-group v-if="!hideRange" prepend="Min 1" size="sm" append="Max">
    <b-form-input :title="target[localEncoding]" :value="target.num" @change="onTargetChange" type="range"
                  min="1" :max="hashMax.num" size="sm"/>
  </b-input-group>

  <div class="list label">Max</div>
  <div class="list value">{{ this.hashMax[localEncoding] }}</div>

  <div class="list label">Probability (Only of x% of possible hashes will be accepted).</div>
  <div class="list value">~{{ getProbability }}%</div>

  <div class="list label">Odds</div>
  <div class="list value">{{ getNumerator }} out of {{ getDenominator }}</div>

  <div class="list label">Average number of guesses to find a valid hash</div>
  <div class="list value">~{{ Number(avgHashes.toFixed(0)).toLocaleString() }}</div>
</ToolCard>
</template>

<script>
import ToolCard from '@/components/cards/ToolCard';
import Num from '@/services/Num';

export default {
  components: {
    ToolCard
  },
  props: {
    avgHashes: null,
    denominator: null,
    hashMax: Num,
    hideRange: Boolean,
    localEncoding: String,
    numerator: null,
    probability: null,
    target: Num,
    targetMax: Num
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
.header_addon {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
