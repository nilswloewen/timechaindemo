import Num from '@/services/Num';
import { sha256dFromHex } from '@/services/sha256_utils';

class Block {
  constructor(hash, header, height) {
    this.hash = hash;
    this.header = header;
    this.height = height;

    this.color = '#61e294';
    this.isHashValid = true;
    this.prevColor = '';
    this.timeToMine = 0;
    this.tries = 0;
    this.startTime = 0;
  }

  async calcHash(hexDigits = 64) {
    let hex = await sha256dFromHex(this.header.serialize());
    hex = hex.substr(0, hexDigits);
    this.hash = new Num(BigInt(`0x${ hex }`), hexDigits);
  }
}

export default Block;
