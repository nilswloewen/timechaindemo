import { sha256dFromHex } from '@/services/utils';

class Block {
  constructor(hash, header, height) {
    this.hash = hash;
    this.header = header;
    this.height = height;

    this.color = '';
    this.isHashValid = true;
    this.prevColor = '';
    this.stats = [];
  }

  async calcHash() {
    const hex = await sha256dFromHex(this.header.serialize());
    this.hash = this.encode(BigInt(`0x${hex}`));
  }
}

export default Block;
