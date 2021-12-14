import Num from '@/services/Num';
import BlockHeader from './BlockHeader';

class DemoBlockHeader extends BlockHeader {
  constructor(data, nonce, prevHash) {
    const time = new Date().getTime() / 1000;
    super(0, '', nonce, prevHash, time, 0);
    this.data = data;
  }

  static get genesis() {
    const hexDigits = 2;
    const data = this.getRandomData();
    return new DemoBlockHeader(data, 0, new Num(0n, hexDigits));
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
      'Eve',
      'Elon',
      'Faythe',
      'Grace',
      'Heidi',
      'Ivan',
      'Mallory',
      'Olivia',
      'Peggy',
      'Ramesh',
      'Rupert',
      'Saylor',
      'Sybil',
      'Trudy',
      'Victor',
      'Walter',
      'Wendy',
      'Yves',
    ];

    let rand = Math.floor(Math.random() * names.length);
    const sender = names[rand];

    rand = Math.floor(Math.random() * names.length);
    const receiver = names[rand];

    return { sender, receiver };
  }

  serialize() {
    return this.data + this.prevHash.hexadecimal + this.nonce;
  }
}

export default DemoBlockHeader;
