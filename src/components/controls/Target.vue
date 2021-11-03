<template>
  <b-card class="text-center" header="Target">

    We will only accept <div class="stat probability">{{ this.probability }}%</div> of possible hashes.
    <br/>

    Each try has a <div class="stat odds">{{ this.numerator }}</div> out of <div class="stat odds">{{ this.denominator }}</div> chance of winning.

    <br/>
    On average it will take <div class="stat odds">~{{ this.estimatedTries }}</div> tries to find a valid hash.

    <div class="text-center m-3">
      Min 0
      <b-form-input v-model.number="target" title="Target" type="range" min="0" :max="max - 1" style="width: 70%; "/>
      Max 255
    </div>

    <table id="target_table" class="m-auto">
      <tr><th>Encoding   </th> <th>Base</th> <th>Value</th></tr>
      <tr><td>Decimal    </td> <td> 10 </td> <td>{{ target.toString() }}</td></tr>
      <tr><td>Hexadecimal</td> <td> 16 </td> <td>{{ target.toString(16).padStart(2, '0') }}</td></tr>
      <tr><td>Binary     </td> <td>  2 </td> <td>{{ target.toString(2).padStart(8, '0') }}</td></tr>
    </table>
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
        target: 31,
        numerator: Number,
        denominator: Number,
        probability: Number,
        estimatedTries: Number,
      }
    },
    mounted() {
      this.target = this.initialTarget;
      // this.$emit('updateTarget', this.target);
      this.calcStats();
    },
    watch: {
      target() {
        this.calcStats();
        // this.$emit('updateTarget', this.target);
      }
    },
    methods: {
      calcStats() {
        const target = this.target + 1;
        this.probability = ((target / this.max) * 100).toFixed(2).padStart(5, '0');

        const gcd = this.gcd(target, this.max);
        this.numerator = target / gcd;
        this.denominator = this.max / gcd;
        this.estimatedTries = this.denominator;
      },
      gcd(numerator, denominator) {
        let a = numerator;
        let b = denominator;
        // eslint-disable-next-line no-constant-condition
        while(true) {
          if (b === 0) return a;
          a %= b;
          if (a === 0) return b;
          b %= a;
        }
      },
    }

  }
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