import mempoolJS from '@mempool/mempool.js';

class Mempool {
  constructor() {
    const { bitcoin: { blocks } } = mempoolJS({ hostname: 'mempool.space' });
    this.api = blocks;
  }

  async getBlockById(hash) {
    const block = await this.api.getBlock({ hash });

    // In case of Genesis block returning prev hash as null.
    block.previousBlockHash = block.previousblockhash || ''.padStart(64, '0');
    delete block.previousblockhash;

    return block;
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
