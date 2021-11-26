<template>
  <div>
    <template v-if="range">
      <b-input-group prepend="Min 1" size="sm" append="Max">
        <b-form-input :title="target[localEncoding]" :value="target.num" @change="onTargetChange" type="range"
                      min="1" :max="getMax" size="sm"/>
      </b-input-group>
    </template>

    <template v-else>
      <b-card no-body class="mb-2">
        <b-card-header>
          <div>Target</div>
          {{ target[localEncoding] }}
        </b-card-header>

        <b-input-group prepend="Min 1" size="sm" append="Max">
          <b-form-input :title="target[localEncoding]" :value="target.num" @change="onTargetChange" type="range"
                        min="1" :max="getMax" size="sm"/>
        </b-input-group>

        <template v-if="full">
          <b-list-group-item class="list-field">Probability</b-list-group-item>
          <b-list-group-item class="list-value">
            Only <div class="stat probability">~{{ getProbability }}%</div>
            of possible hashes will be accepted.
          </b-list-group-item>

          <b-list-group-item class="list-field">Odds</b-list-group-item>
          <b-list-group-item class="list-value">
            Each try has a <div class="stat odds">{{ getNumerator }}</div> out of
            <div class="stat odds">{{ getDenominator }}</div> chance of winning.
          </b-list-group-item>

          <b-list-group-item class="list-field">Average</b-list-group-item>
          <b-list-group-item class="list-value">
            On average it will take <div class="stat odds">~{{ avgHashes.toFixed(0) }}</div>
            tries to find a valid hash.
          </b-list-group-item>
        </template>
      </b-card>
    </template>
  </div>
</template>

<script>
import Num from '@/services/Num';

export default {
  props: {
    avgHashes: null,
    denominator: null,
    full: Boolean,
    localEncoding: String,
    numerator: null,
    probability: null,
    range: Boolean,
    target: Num,
    targetMax: Num,
    hashMax: Num,
  },
  computed: {
    getProbability() {
      return (this.probability * 100).toFixed(2).padStart(5, '0');
    },
    getMax() {
      return Number(this.targetMax.bigInt - 1n);
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
    },
  }
};
</script>

<style>
  .stat {
    display: inline-block;
    font-weight: bold;
  }
  .odds {
    min-width: 30px;
  }
  .probability {
    min-width: 68px;
  }
</style>
