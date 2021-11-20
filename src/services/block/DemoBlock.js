import Block from './Block';
import { sha256dFromText } from '@/services/utils';

class DemoBlock extends Block {
  constructor(hash, header, height, color, prevColor) {
    super(hash, header, height);
    this.color = color;
    this.prevColor = prevColor;
    this.isHashValid = false;
    this.stats = [];
  }

  async calcHash() {
    this.hash = this.encode(await sha256dFromText(this.header.serialize()));
  }
}

export default DemoBlock;
