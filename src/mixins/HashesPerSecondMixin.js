export default {
  data: () => ({ hpsOfThisDevice: 0 }),
  methods: {
    async calibrateHps() {
      const start = new Date().getTime();
      let elapsed = 0;

      while (elapsed < 3000) {
        this.blocks[0].header.nonce += 1;
        // eslint-disable-next-line no-await-in-loop
        await this.finalizeBlock(0);
        elapsed = new Date().getTime() - start;
      }

      this.hpsOfThisDevice = this.blocks[0].header.nonce / (elapsed / 1000);

      // Reset block.
      this.blocks[0].header.nonce = 0;
      await this.finalizeBlock(0);
    },
    calcAvgHashes() {
      return 1 / (this.target / this.targetMax);
    },
  },
};
