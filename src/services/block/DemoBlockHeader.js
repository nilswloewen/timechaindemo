import BlockHeader from './BlockHeader';
import Num from '@/services/Num';

class DemoBlockHeader extends BlockHeader {
  constructor(data, nonce, prevHash) {
    const time = new Date().getTime() / 1000;
    super(0, '', nonce, prevHash, time, 0);
    this.data = data;
  }

  static get genesis() {
    const data = this.getRandomData();
    return new DemoBlockHeader(data, 0, new Num(BigInt(0)));
  }

  serialize() {
    return this.data + this.prevHash.hexadecimal + this.nonce;
  }

  static getRandomData() {
    const { sender, receiver } = this.getNames();
    const randBtc = Math.floor(Math.random() * 99 + 1);
    return `${ sender } sent ${ receiver } ${ randBtc }₿`;
  }

  static getNames() {
    const names = [
      'Alice',
      'Bob',
      'Carlos',
      'Chuck',
      'Craig',
      'Dan',
      'Da5id',
      'Eve',
      'Yves',
      'Faythe',
      'Grace',
      'Heidi',
      'Ivan',
      'Mallory',
      'Olivia',
      'Peggy',
      'Rupert',
      'Ramesh',
      'Sybil',
      'Trudy',
      'Victor',
      'Walter',
      'Wendy'
    ];

    const actors = { sender: '', receiver: '' };
    for (const [key] of Object.entries(actors)) {
      const rand = Math.floor(Math.random() * names.length + 1);
      actors[key] = names.splice(rand, 1);
    }
    return actors;
  }
}

export default DemoBlockHeader;
