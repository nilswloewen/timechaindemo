export default {
  methods: {
    async solveNonce(index) {
      const startTime = new Date().getTime();
      const block = this.blocks[index];
      const startingNonce = block.header.nonce;

      // Allow Solve btn to be clicked even when hash is valid.
      if (block.isHashValid) {
        block.header.nonce += 1;
        await this.finalizeBlock(index);
      }

      while (!block.isHashValid) {
        block.header.nonce += 1;
        // eslint-disable-next-line no-await-in-loop
        await this.finalizeBlock(index);
      }

      await this.delayedUpdate(index);
      block.stats.push({
        tries: block.header.nonce - startingNonce,
        elapsed: new Date().getTime() - startTime,
      });
    },
  },
};
