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
        <b-card-header class="text-center">
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
            Only <div class="stat probability">{{ getProbability }}%</div>
            of possible hashes will be accepted.
          </b-list-group-item>

          <b-list-group-item class="list-field">Odds</b-list-group-item>
          <b-list-group-item class="list-value">
            Each try has a <div class="stat odds">{{ numerator.toLocaleString('en-US') }}</div> out of
            <div class="stat odds">{{ denominator.toLocaleString('en-US') }}</div> chance of winning.
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
    full: Boolean,
    range: Boolean,
    target: Num,
    targetMax: Num,
    avgHashes: null,
    denominator: null,
    numerator: null,
    probability: null,
    localEncoding: String,
  },
  computed: {
    getProbability() {
      return (this.probability * 100).toFixed(2).padStart(5, '0');
    },
    getMax() {
      return Number(this.targetMax.bigInt - 1n);
    },
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
