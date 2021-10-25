import * as wasm from 'wasm_sha256_from_hex_str';
import Mempool from './js/Mempool';
import {
  calcHash, calcTarget, generateTable, formatBlock,
} from './js/util';
import Graph from './js/Graph';

wasm.set_panic_hook();

let start = 0;
let tries = 0;
let rawBlock = {};

function initGraph() {
  const canvasMinWidth = 965;
  const viewPortWidth = document.documentElement.clientWidth - 50;
  const canvasWidth = viewPortWidth > canvasMinWidth ? viewPortWidth : canvasMinWidth;
  return new Graph('graph', 500, canvasWidth);
}
const graph = initGraph();

// Submit Button.
document.getElementById('submit_btn').onclick = async (e) => {
  e.preventDefault();

  start = start === 0 ? new Date().getTime() : start;
  tries += 1;

  const nonce = document.getElementById('nonce_input').valueOf().value;
  const hash = calcHash(rawBlock, nonce);

  const encodings = {
    hexadecimal: hash,
    binary: BigInt(`0x${hash}`).toString(2).padStart(256, '0'),
    exponential: Number(`0x${hash}`).toExponential(),
    decimal: BigInt(`0x${hash}`).toLocaleString('en-US'),
  };

  graph.guesses.push({
    xRatio: 0,
    yRatio: parseInt(hash, 16) / 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff,
    encodings,
  });

  generateTable(document.querySelector('table#encoding'), {
    hexadecimal: encodings.hex,
    // Fold binary.
    Binary: encodings.binary.replace(
      /(\d{64})(\d{64})(\d{64})(\d{64})/,
      '$1\n↳$2\n↳$3\n↳$4',
    ),
    exponential: encodings.exponential,
    Decimal: encodings.decimal,
  });
};

// Increment Button.
document.getElementById('increment_btn').onclick = async (e) => {
  e.preventDefault();

  const nonceInput = document.getElementById('nonce_input');
  const nonce = Number(nonceInput.valueOf().value);
  nonceInput.valueOf().value = nonce + 1;
  document.getElementById('submit_btn').click();
};

// Increment with Space, Enter, or Up Arrow.
document.addEventListener('keydown', (e) => {
  e.preventDefault();
  if (e.code === 'Space' || e.code === 'Enter' || e.code === 'ArrowUp') {
    document.getElementById('increment_btn').click();
  }
});

// Reset timer.
document.getElementById('reset_btn').onclick = async (e) => {
  e.preventDefault();
  start = new Date().getTime();
  tries = 0;
  graph.guesses = [];
};

// Change encoding.
document.getElementById('encoding_btn').onclick = async (e) => {
  e.preventDefault();
  switch (graph.encoding) {
    case 'hex':
      graph.encoding = 'decimal';
      e.target.innerText = 'Decimal';
      break;
    case 'decimal':
      graph.encoding = 'exponential';
      e.target.innerText = 'exponential Notation';
      break;
    case 'exponential':
      graph.encoding = 'binary';
      e.target.innerText = 'Binary';
      break;
    case 'binary':
    default:
      graph.encoding = 'hex';
      e.target.innerText = 'hexadecimal:';
      break;
  }
};

function calcGraph() {
  graph.calcTicks();
  graph.calcGuesses();
  setTimeout(calcGraph, 25);
}

function drawGraph() {
  graph.clear();
  graph.drawTicks();
  graph.drawGuesses();
  graph.drawEndCaps();

  // Hashes per second.
  const elapsed = new Date().getTime() - start;
  const xLabel = (tries / elapsed) * 1000;
  graph.drawAxis(`${String(xLabel).substr(0, 4)} hashes per second`);

  graph.drawAxisLabels();

  const target = calcTarget(rawBlock.difficulty);
  const targetLabel = BigInt(target).toLocaleString('en-US');
  const yRatio = target / 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
  graph.drawTarget(yRatio, targetLabel);

  window.requestAnimationFrame(drawGraph);
}

async function populateBlock() {
  const mempool = new Mempool();
  const blockHash = await mempool.getLatestBlockHash();
  rawBlock = await mempool.getBlockByHash(blockHash);

  generateTable(document.querySelector('table#block'), formatBlock(rawBlock));
}

populateBlock().then(() => {
  calcGraph();
  drawGraph();
});
