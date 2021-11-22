import Num from '@/services/Num';

export default {
  methods: {
    updateHexDigits(newLimit) {
      this.hexDigits = newLimit;
      const hex = '0x'.padEnd(newLimit + 2, 'f');
      const max = new Num(BigInt(hex), newLimit);
      this.targetMax = max;
      this.hashMax = max;
      this.guesses = [];
    },
  },
};
