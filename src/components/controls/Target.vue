<template>
  <b-card no-body class="mb-2">

    <b-table-simple>
      <b-thead head-variant="dark">
        <b-tr>
          <b-th>Target</b-th>
          <b-th colspan="3">
            <b-input-group prepend="Min 1" append="Max 255" size="sm" >
              <b-form-input :title="target" v-model.number="target" type="range"
                            min="1" :max="max - 1" size="sm"/>
            </b-input-group>
          </b-th>
        </b-tr>
      </b-thead>

      <b-tbody>
        <b-tr>
          <b-td>Value</b-td>
          <b-td>{{ target.toString(16).padStart(2, '0') }}<sub>16</sub></b-td>
          <b-td>{{ target.toString() }}<sub>10</sub></b-td>
          <b-td>{{ target.toString(2).padStart(8, '0') }}<sub>2</sub></b-td>
        </b-tr>

        <template v-if="full">
         <b-tr>
          <b-td> Probability </b-td>
           <b-td colspan="3">
             Only <div class="stat probability">{{ this.probability }}%</div>
             of possible hashes will be accepted.
           </b-td>
         </b-tr>
          <b-tr>
            <b-td>Odds</b-td>
            <b-td colspan="3">
              Each try has a <div class="stat odds">{{ this.numerator }}</div> out of
              <div class="stat odds">{{ this.denominator }}</div> chance of winning.
            </b-td>
          </b-tr>
          <b-tr>
            <b-td>Average</b-td>
            <b-td colspan="3">
              On average it will take <div class="stat odds">~{{ this.estimatedTries }}</div>
              tries to find a valid hash.
            </b-td>
          </b-tr>
      </template>

      </b-tbody>
    </b-table-simple>
  </b-card>
</template>

<script>
export default {
  props: {
    initialTarget: Number,
    max: Number,
    full: Boolean,
  },

  data() {
    return {
      target: 1,
      numerator: Number,
      denominator: Number,
      probability: Number,
      estimatedTries: Number,
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
      this.estimatedTries = ((1 / this.probability) * 100).toFixed(0);
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
