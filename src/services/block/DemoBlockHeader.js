import BlockHeader from './BlockHeader';
import Num from '@/services/Num';

class DemoBlockHeader extends BlockHeader {
  constructor(data, nonce, prevHash) {
    const time = new Date().getTime() / 1000;
    super(0, '', nonce, prevHash, time, 0);
    this.data = data;
  }

  static get genesis() {
    const randBtc = Math.floor(Math.random() * 99 + 1);
    return new DemoBlockHeader(`Alice sent Bob ${randBtc}₿`, 0, new Num(BigInt(0)));
  }

  serialize() {
    return this.data + this.prevHash.hexadecimal + this.nonce;
  }
}

export default DemoBlockHeader;
