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
  console.log(block);
  const prevBlockhash = block.previousBlockHash || ''.padStart(64, '0');

  return swapEndian(intToHex(block.version))
    + swapEndian(prevBlockhash)
    + swapEndian(block.merkle_root)
    + swapEndian(intToHex(block.timestamp))
    + swapEndian(intToHex(block.bits))
    + swapEndian(intToHex(nonce));
}

async function sha256_from_text(text) {
  return await sha256_from_Uint8Array(textToUint8Array(text));
}
async function sha256d_from_text(data) {
  const pass1 = await sha256_from_text(data);
  const pass2 = await sha256_from_text(pass1);
  return swapEndian(pass2);
}
function textToUint8Array(text) {
  return new TextEncoder().encode(text);
}

function hexToUint8Array(hex_str) {
  if (hex_str.length % 2 !== 0) {
    console.error("Input length must be even number.")
    return '';
  }

  return new Uint8Array(hex_str.match(/.{1,2}/g).map((pair) => parseInt(pair, 16)));
}
async function sha256_from_hex(hex_str) {
  return await sha256_from_Uint8Array(hexToUint8Array(hex_str));
}
async function sha256d_from_hex(data) {
  const pass1 = await sha256_from_hex(data);
  const pass2 = await sha256_from_hex(pass1);
  return swapEndian(pass2);
}

async function sha256_from_Uint8Array(arr) {
  const hashBuffer = await crypto.subtle.digest('SHA-256', arr);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export {
  intToHex,
  serializeBlockHeader,
  sha256d_from_hex,
  sha256d_from_text,
};