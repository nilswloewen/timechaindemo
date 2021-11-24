import Block from './Block';
import { sha256dFromText } from '@/services/sha256_utils';
import Num from '@/services/Num';

class DemoBlock extends Block {
  constructor(hash, header, height, color, prevColor) {
    super(hash, header, height);
    this.color = color;
    this.prevColor = prevColor;
    this.isHashValid = false;
    this.stats = [];
  }

  async calcHash(hexDigits = 64) {
    let hex = await sha256dFromText(this.header.serialize());
    hex = hex.substr(0, hexDigits);
    this.hash = new Num(BigInt(`0x${hex}`), hexDigits);
  }
}

export default DemoBlock;
