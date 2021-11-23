export default {
  methods: {
    async updateNonce(nonce, index) {
      this.blocks[index].header.nonce = nonce;
      await this.delayedUpdate(index);
    },
    async startMining(index) {
      this.isMining = true;
      await this.solveNonce(index);
    },
    async solveNonce(index) {
      const block = this.blocks[index];

      // Allow Solve btn to be clicked even when hash is valid.
      if (block.isHashValid) {
        block.header.nonce += 1;
        await this.finalizeBlock(index);
      }

      while (!block.isHashValid && this.isMining) {
        block.header.nonce += 1;
        // eslint-disable-next-line no-await-in-loop
        await this.finalizeBlock(index);
      }

      this.isMining = false;

      if (index > 0) {
        await this.delayedUpdate(index - 1);
      }
    },
  },
};
