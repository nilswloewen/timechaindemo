import mempoolJS from '@mempool/mempool.js';
import Block from '@/services/block/Block';
import BlockHeader from '@/services/block/BlockHeader';

class Mempool {
  constructor() {
    const { bitcoin: { blocks } } = mempoolJS({ hostname: 'mempool.space' });
    this.api = blocks;
  }

  async getBlockById(hash) {
    const block = await this.api.getBlock({ hash });

    const header = new BlockHeader(
      block.bits,
      block.merkle_root,
      block.nonce,
      block.previousblockhash || ''.padStart(64, '0'),
      block.timestamp,
      block.version,
    );

    return new Block(block.id, header, block.height);
  }

  async getLatestBlockHash() {
    return this.api.getBlocksTipHash();
  }

  async getBlockIdFromHeight(height) {
    return this.api.getBlockHeight({ height });
  }
}

export default Mempool;
