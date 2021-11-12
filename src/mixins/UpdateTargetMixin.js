export default {
  methods: {
    updateTarget(newTarget) {
      this.target = newTarget;

      // Check if all blocks are still under the target.
      for (let i = 0; i < this.blocks.length; i += 1) {
        const hash = parseInt(this.blocks[i].hash.toString().substr(0, this.hexDigits), 16);
        this.blocks[i].isHashValid = hash < this.target;
        this.blocks[i].stats = [];
      }
    },
  },
};
