import Num from '@/services/Num';
import { sha256dFromText } from '@/services/sha256_utils';
import Block from './Block';

class DemoBlock extends Block {
  constructor(hash, header, height, color, prevColor) {
    super(hash, header, height);
    this.color = color;
    this.prevColor = prevColor;
    this.isHashValid = false;
    this.tries = 0;
    this.timeToMine = 0;
  }

  async calcHash(hexDigits = 64) {
    let hex = await sha256dFromText(this.header.serialize());
    hex = hex.substr(0, hexDigits);
    this.hash = new Num(BigInt(`0x${ hex }`), hexDigits);
  }
}

export default DemoBlock;
