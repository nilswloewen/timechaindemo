import Num from '@/services/Num';
import { intToHex, swapEndian } from '@/services/sha256_utils';

class BlockHeader {
  constructor(bits, merkleRoot, nonce, prevHash, timestamp, version) {
    this.bits = bits;
    this.merkleRoot = merkleRoot;
    this.nonce = nonce;
    this.prevHash = prevHash;
    this.timestamp = timestamp;
    this.version = version;
  }

  static get genesis() {
    return new BlockHeader(
      486604799,
      '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
      2083236893,
      new Num(0n, 64),
      1231006505,
      1,
    );
  }

  serialize() {
    return swapEndian(intToHex(this.version))
      + swapEndian(this.prevHash.hexadecimal)
      + swapEndian(this.merkleRoot)
      + swapEndian(intToHex(this.timestamp))
      + swapEndian(intToHex(this.bits))
      + swapEndian(intToHex(this.nonce));
  }
}

export default BlockHeader;
