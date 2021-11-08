import { intToHex, swapEndian } from '@/services/utils';

class BlockHeader {
  constructor(bits, merkleRoot, nonce, prevHash, timestamp, version) {
    this.bits = bits;
    this.merkleRoot = merkleRoot;
    this.nonce = nonce;
    this.prevHash = prevHash;
    this.timestamp = timestamp;
    this.version = version;
  }

  serialize() {
    return swapEndian(intToHex(this.version))
      + swapEndian(this.prevHash)
      + swapEndian(this.merkleRoot)
      + swapEndian(intToHex(this.timestamp))
      + swapEndian(intToHex(this.bits))
      + swapEndian(intToHex(this.nonce));
  }

  static get genesis() {
    return new BlockHeader(
      486604799,
      '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
      2083236893,
      ''.padStart(64, '0'),
      1231006505,
      1,
    );
  }
}

export default BlockHeader;
