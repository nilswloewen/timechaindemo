import { sha256dFromHex } from '@/services/utils';

class Block {
  constructor(hash, header, height) {
    this.hash = hash;
    this.header = header;
    this.height = height;

    this.color = '';
    this.isHashValid = false;
    this.prevColor = '';
    this.stats = [];
  }

  async calcHash() {
    this.hash = await sha256dFromHex(this.header.serialize());
  }
}

export default Block;
