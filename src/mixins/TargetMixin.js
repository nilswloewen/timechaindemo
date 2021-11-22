import Num from '@/services/Num';

export default {
  data() {
    return {
      avgHashes: 0,
      denominator: 1n,
      hashMax: new Num(255n),
      numerator: 0n,
      probability: 0.2,
      target: new Num(32n),
      targetMax: new Num(255n),
    };
  },
  mounted() {
    this.calcStats();
    this.target.yRatio = this.target.num / this.hashMax.num;
  },
  watch: {
    targetMax() {
      this.calcStats();
    }
  },
  methods: {
    async updateTarget(newTarget) {
      this.target = newTarget;
      this.calcStats();
      this.target.yRatio = this.target.num / this.hashMax.num;

      // Check if all blocks are still under the target.
      for (let i = 0; i < this.blocks.length; i += 1) {
        this.blocks[i].isHashValid = this.blocks[i].hash.bigInt < this.target.bigInt;
      }
    },

    calcStats() {
      this.probability = this.target.num / this.targetMax.num;

      const gcd = this.gcd(this.target.bigInt, this.targetMax.bigInt);
      this.numerator = this.target.bigInt / gcd;
      this.denominator = this.targetMax.bigInt / gcd;
      this.avgHashes = 1 / this.probability;
    },

    gcd(first, second) {
      let a = first;
      let b = second;

      while (true) {
        if (b === BigInt(0)) return a;
        a %= b;
        if (a === BigInt(0)) return b;
        b %= a;
      }
    },
  },
};
