import mempoolJS from '@mempool/mempool.js';

class Mempool {
  constructor() {
    const { bitcoin: { blocks } } = mempoolJS({ hostname: 'mempool.space' });
    this.api = blocks;
  }

  async getBlockById(hash) {
    return this.api.getBlock({ hash });
  }

  async getLatestBlockHash() {
    return this.api.getBlocksTipHash();
  }

  async getLastTenBlocksFrom(height) {
    return this.api.getBlocks({ start_height: height });
  }

  async getBlockIdFromHeight(height) {
    return this.api.getBlockHeight({ height });
  }

  async getHeightOfLatestBlock() {
    return this.api.getBlocksTipHeight();
  }
}

export default Mempool;
