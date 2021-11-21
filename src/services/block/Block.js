import { sha256dFromHex } from '@/services/utils';
import Num from '@/services/Num';

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

  async calcHash(hexDigits = 64) {
    let hex = await sha256dFromHex(this.header.serialize());
    hex = hex.substr(0, hexDigits);
    this.hash = new Num(BigInt(`0x${hex}`));
  }
}

export default Block;
