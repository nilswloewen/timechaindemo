import { sha256dFromHex } from '@/services/utils';

class Block {
  constructor(hash, header, height) {
    this.hash = hash;
    this.header = header;
    this.height = height;
  }

  async calcHash() {
    this.hash = await sha256dFromHex(this.header.serialize());
  }
}

export default Block;
