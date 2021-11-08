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
  const prevBlockhash = block.previousBlockHash || ''.padStart(64, '0');

  return swapEndian(intToHex(block.version))
    + swapEndian(prevBlockhash)
    + swapEndian(block.merkle_root)
    + swapEndian(intToHex(block.timestamp))
    + swapEndian(intToHex(block.bits))
    + swapEndian(intToHex(nonce));
}

async function sha256FromUint8Array(arr) {
  const hashBuffer = await crypto.subtle.digest('SHA-256', arr);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function textToUint8Array(text) {
  return new TextEncoder().encode(text);
}
async function sha256FromText(text) {
  return sha256FromUint8Array(textToUint8Array(text));
}
async function sha256dFromText(data) {
  const pass1 = await sha256FromText(data);
  const pass2 = await sha256FromText(pass1);
  return swapEndian(pass2);
}

function hexToUint8Array(hexStr) {
  if (hexStr.length % 2 !== 0) {
    return '';
  }

  return new Uint8Array(hexStr.match(/.{1,2}/g).map((pair) => parseInt(pair, 16)));
}
async function sha256FromHex(hexStr) {
  return sha256FromUint8Array(hexToUint8Array(hexStr));
}
async function sha256dFromHex(data) {
  const pass1 = await sha256FromHex(data);
  const pass2 = await sha256FromHex(pass1);
  return swapEndian(pass2);
}

export {
  intToHex,
  serializeBlockHeader,
  sha256dFromHex,
  sha256dFromText,
  swapEndian,
};
