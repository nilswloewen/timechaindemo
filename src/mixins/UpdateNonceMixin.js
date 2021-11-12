export default {
  methods: {
    async updateNonce(nonce, index) {
      this.blocks[index].header.nonce = nonce;
      await this.delayedUpdate(index);
    },
  },
};
