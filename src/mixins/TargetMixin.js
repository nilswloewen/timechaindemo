export default {
  data() {
    return {
      initialTarget: 32,
      target: { yRatio: 0.2, bigInt: 0 },
      targetMax: { bigInt: 0 },
    };
  },
  methods: {
    updateTarget(newTarget) {
      this.target = this.encode(newTarget);

      // Check if all blocks are still under the target.
      for (let i = 0; i < this.blocks.length; i += 1) {
        this.blocks[i].isHashValid = this.blocks[i].hash.bigInt < this.target.bigInt;
      }
    },
  },
};
