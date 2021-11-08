<template>
  <b-card class="text-center" header="Target">

    We will only accept <div class="stat probability">{{ this.probability }}%</div>
    of possible hashes.
    <br/>

    Each try has a <div class="stat odds">{{ this.numerator }}</div> out of
    <div class="stat odds">{{ this.denominator }}</div> chance of winning.

    <br/>
    On average it will take <div class="stat odds">~{{ this.estimatedTries }}</div>
    tries to find a valid hash.

    <div class="text-center m-3">
      <label class="d-block"> Target </label>
      Min 1
      <b-form-input :title="target" v-model.number="target" type="range"
                   min="1" :max="max - 1" style="width: 70%; "/>
      Max 255
    </div>

    <table id="target_table" class="m-auto">
      <tr><th>Encoding   </th><th>Value</th></tr>
      <tr><td>Decimal    </td><td>{{ target.toString() }}</td></tr>
      <tr><td>Hexadecimal</td><td>{{ target.toString(16).padStart(2, '0') }}</td></tr>
      <tr><td>Binary     </td><td>{{ target.toString(2).padStart(8, '0') }}</td></tr>
    </table>
    Winning hash must be in the range of 0..{{ this.target - 1 }}.
  </b-card>
</template>

<script>
export default {
  props: {
    initialTarget: Number,
    max: Number,
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
      const possible = this.target;
      this.probability = (((possible) / this.max) * 100).toFixed(2).padStart(5, '0');

      const gcd = this.gcd(possible, this.max);
      this.numerator = possible / gcd;
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
