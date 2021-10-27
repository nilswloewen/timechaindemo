function intToHex(val) {
  return Number(val).toString(16).padStart(8, '0');
}

function swapEndian(val) {
  const str = String(val);

  const result = [];
  let len = str.length - 2;

  while (len >= 0) {
    const pair = str.substr(len, 2);
    result.push(pair);
    len -= 2;
  }
  return result.join('');
}

function serializeBlockHeader(block, nonce) {
  // In case of Genesis block returning prev hash as null.
  const prevBlockhash = block.previousBlockhash|| ''.padStart(64, '0');

  return swapEndian(intToHex(block.version))
    + swapEndian(prevBlockhash)
    + swapEndian(block.merkle_root)
    + swapEndian(intToHex(block.timestamp))
    + swapEndian(intToHex(block.bits))
    + swapEndian(intToHex(nonce));
}

export {
  serializeBlockHeader, swapEndian
}

