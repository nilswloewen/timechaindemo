import BlockHeader from './BlockHeader';

class DemoBlockHeader extends BlockHeader {
  constructor(data, nonce, prevHash) {
    const time = new Date().getTime() / 1000;
    super(0, '', nonce, prevHash, time, 0);
    this.data = data;
  }

  static get genesis() {
    return new DemoBlockHeader('Alice sent Bob 5$', 0, ''.padStart(64, '0'));
  }

  serialize() {
    return this.data + this.prevHash + this.nonce;
  }
}

export default DemoBlockHeader;
