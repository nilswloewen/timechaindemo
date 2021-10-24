import * as wasm from 'wasm_sha256_from_hex_str';

const intToHex = (val) => Number(val).toString(16).padStart(8, '0');

const swapEndian = (val) => {
  const str = String(val);

  const result = [];
  let len = str.length - 2;

  while (len >= 0) {
    const pair = str.substr(len, 2);
    result.push(pair);
    len -= 2;
  }
  return result.join('');
};

const sha256d = (hexStr) => {
  let hash = wasm.sha256_of_hex_str(hexStr);
  hash = wasm.sha256_of_hex_str(hash);
  return swapEndian(hash);
};

const serializeBlockHeader = (
  version,
  previousBlockhash,
  merkleRoot,
  timestamp,
  bits,
  nonce,
) => {
  // In case of Genesis block returning prev hash as null.
  const prevBlockhash = previousBlockhash || ''.padStart(64, '0');

  return swapEndian(intToHex(version))
  + swapEndian(prevBlockhash)
  + swapEndian(merkleRoot)
  + swapEndian(intToHex(timestamp))
  + swapEndian(intToHex(bits))
  + swapEndian(intToHex(nonce));
};

const calcHash = (block, nonce) => {
  const blockHeader = serializeBlockHeader(
    block.version,
    block.previousblockhash,
    block.merkle_root,
    block.timestamp,
    block.bits,
    nonce,
  );

  return sha256d(blockHeader);
};

function generateTable(table, data) {
  table.innerHTML = '';
  Object.entries(data).forEach(([key, value]) => {
    const row = table.insertRow();
    row.insertCell().appendChild(document.createTextNode(key));
    row.insertCell().appendChild(document.createTextNode(String(value)));
  });
}

function formatBlock(block) {
  const date = new Date(block.timestamp * 1000);
  const time = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(date);

  return {
    'Id (hash)': block.id,
    Height: block.height,
    Version: block.version,
    'Previous Block Hash': block.previousblockhash,
    'Merkle Root': block.merkle_root,
    Time: time,
    Bits: block.bits,
    Nonce: block.nonce,
  };
}

function calcTarget(difficulty) {
  const targetMax = 0x00000000ffff0000000000000000000000000000000000000000000000000000;
  return targetMax / Number(difficulty);
}

export {
  calcHash, formatBlock, generateTable, calcTarget,
};
