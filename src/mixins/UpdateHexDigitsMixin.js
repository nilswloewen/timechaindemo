import Num from '@/services/Num';

export default {
  methods: {
    updateHexDigits(newHexDigits) {
      this.hexDigits = newHexDigits;

      const hex = '0x'.padEnd(this.hexDigits + 2, 'f');
      const max = BigInt(hex);

      this.targetMax = new Num(max - 1n, this.hexDigits);
      this.hashMax = new Num(max, this.hexDigits);

      // Reset guesses so they are not still painted on graph.
      this.guesses = [];
    },
  },
};
