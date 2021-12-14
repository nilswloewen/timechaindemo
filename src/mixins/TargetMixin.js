import Num from '@/services/Num';

export default {
  data() {
    return {
      avgHashes: 4,
      denominator: 1n,
      difficulty: 0,
      hashMax: new Num(255n),
      numerator: 0n,
      probability: 0.06,
      target: new Num(15n),
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
    },
  },
  methods: {
    async updateTarget(newTarget) {
      // If hashMax is changed set target to max.
      this.target = newTarget;
      this.target.yRatio = this.target.num / this.hashMax.num;

      this.calcStats();

      this.guesses = [];
      this.resetBlocks();
    },

    calcStats() {
      this.difficulty = this.targetMax.num / this.target.num;
      this.probability = this.target.num / this.hashMax.num;
      this.avgHashes = 1 / this.probability;

      const gcd = this.gcd(this.target.bigInt, this.hashMax.bigInt);
      this.numerator = this.target.bigInt / gcd;
      this.denominator = this.hashMax.bigInt / gcd;
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
