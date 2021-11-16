<template>
  <b-card no-body class="mb-2">
    <b-card-header class="text-center">
      <span class="float-left"> Target</span> <span>{{ target }}</span>
    </b-card-header>
    <b-input-group prepend="Min 1" size="sm" append="Max">
      <b-form-input :title="target" v-model.number="target" type="range"
                    min="1" :max="max - 1" size="sm"/>
    </b-input-group>

    <b-list-group-item class="list-field">Max</b-list-group-item>
    <b-list-group-item class="list-value">{{ max }}</b-list-group-item>

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
    initialTarget: Number,
    max: Number,
  },

  data() {
    return {
      avgHashes: Number,
      denominator: Number,
      numerator: Number,
      probability: Number,
      target: 1,
    };
  },

  mounted() {
    this.target = this.initialTarget;
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
      this.probability = (((this.target) / this.max) * 100).toFixed(2).padStart(5, '0');

      const gcd = this.gcd(this.target, this.max);
      this.numerator = this.target / gcd;
      this.denominator = this.max / gcd;
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
