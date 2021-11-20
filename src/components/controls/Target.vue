<template>
  <b-card no-body class="mb-2">
    <b-card-header class="text-center">
      <span class="float-left"> Target</span> <span>{{ target[encoding] }}</span>
    </b-card-header>
    <b-input-group prepend="Min 1" size="sm" append="Max">
      <b-form-input :title="target[encoding]" v-model.number="target.bigInt" type="range"
                    min="1" :max="targetMax.bigInt - 1" size="sm"/>
    </b-input-group>

    <b-list-group-item class="list-field">Max</b-list-group-item>
    <b-list-group-item class="list-value">{{ targetMax[encoding] }}</b-list-group-item>

    <template v-if="full">
      <b-list-group-item class="list-field">Probability</b-list-group-item>
      <b-list-group-item class="list-value">
        Only <div class="stat probability">{{ this.probability }}%</div>
        of possible hashes will be accepted.
      </b-list-group-item>

      <b-list-group-item class="list-field">Odds</b-list-group-item>
      <b-list-group-item class="list-value">
        Each try has a <div class="stat odds">{{ this.numerator }}</div> out of
        <div class="stat odds">{{ this.denominator }}</div> chance of winning.
      </b-list-group-item>

      <b-list-group-item class="list-field">Average</b-list-group-item>
      <b-list-group-item class="list-value">
        On average it will take <div class="stat odds">~{{ this.avgHashes }}</div>
        tries to find a valid hash.
      </b-list-group-item>
    </template>

  </b-card>
</template>

<script>
export default {
  props: {
    full: Boolean,
    hexDigits: Number,
    initialTarget: BigInt,
    targetMax: Object,
  },

  data() {
    return {
      avgHashes: Number,
      denominator: Number,
      numerator: Number,
      probability: Number,
      target: { bigInt: 0 },
    };
  },

  mounted() {
    this.target = this.encode(this.initialTarget);
    this.$emit('updateTarget', this.target);
    this.calcStats();
  },

  watch: {
    target() {
      this.calcStats();
      this.$emit('updateTarget', this.target);
    },
  },

  methods: {
    calcStats() {
      this.probability = (((this.target.bigInt) / this.targetMax.bigInt) * 100)
        .toFixed(2).padStart(5, '0');

      const gcd = this.gcd(this.target.bigInt, this.targetMax.bigInt);
      this.numerator = this.target.bigInt / gcd;
      this.denominator = this.targetMax.bigInt / gcd;
      this.avgHashes = ((1 / this.probability) * 100).toFixed(0);
    },

    gcd(first, second) {
      let a = first;
      let b = second;

      // eslint-disable-next-line no-constant-condition
      while (true) {
        if (b === 0) return a;
        a %= b;
        if (a === 0) return b;
        b %= a;
      }
    },
  },
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
