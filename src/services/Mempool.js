import Block from '@/services/block/Block';
import BlockHeader from '@/services/block/BlockHeader';
import Num from '@/services/Num';
import mempoolJS from '@mempool/mempool.js';

class Mempool {
  constructor() {
    const { bitcoin: { blocks } } = mempoolJS({ hostname: 'mempool.space' });
    this.api = blocks;
  }

  async getBlockById(hash) {
    const memBlock = await this.api.getBlock({ hash });
    let prevHash = memBlock.previousblockhash || ''.padStart(64, '0');
    prevHash = new Num(BigInt(`0x${ prevHash }`), 64);

    const header = new BlockHeader(
      memBlock.bits,
      memBlock.merkle_root,
      memBlock.nonce,
      prevHash,
      memBlock.timestamp,
      memBlock.version,
    );

    const id = new Num(BigInt(`0x${ memBlock.id }`), 64);
    return new Block(id, header, Number(memBlock.height));
  }

  async getLatestBlockHash() {
    return this.api.getBlocksTipHash();
  }

  async getBlockIdFromHeight(height) {
    return this.api.getBlockHeight({ height });
  }
}

export default Mempool;
