<template>
  <div id="app">
    <full-page :options="fullPageOptions" id="fullpage">

      <!--      <div id="landing" class="section">-->
      <!--        <b-container class="vh-100">-->
      <!--          <b-row align-v="center" class="vh-100">-->
      <!--            <b-col>-->
      <!--              <b-card title="Manual Miner" align-v="center" class="mb-2">-->
      <!--                <b-card-text>-->
      <!--                  "Mining" is a global competition to validate and record transactions onto the blockchain.-->
      <!--                  Each contestant performs verifiable work and the winner gets newly minted bitcoin.-->
      <!--                  Scroll down to learn more.-->
      <!--                </b-card-text>-->
      <!--              </b-card>-->
      <!--            </b-col>-->
      <!--          </b-row>-->
      <!--        </b-container>-->
      <!--      </div>-->

      <!--      <div id="full_node" class="section">-->
      <!--        <b-container class="vh-100">-->
      <!--          <b-row align-v="center" class="vh-100">-->
      <!--            <b-col>-->
      <!--              <b-card title="Full Node" align-v="center" class="mb-2">-->
      <!--                <b-card-text>-->
      <!--                A full node gathers information about what goes into the next block and sends it to the miner.-->
      <!--                The body of the block is recent transactions. These are organized in a merkle tree. A new transaction is added-->
      <!--                to the list that awards the miner new bitcoin and the transaction fees.-->
      <!--                <ul>-->
      <!--                  Requirements of a Full Node-->
      <!--                  <li>Online 24/7</li>-->
      <!--                  <li>Listen for new transactions and blocks</li>-->
      <!--                  <li>Verify transactions and blocks against the blockchain</li>-->
      <!--                  <li>Relay valid transactions and blocks to the rest of the network (Peer-to-peer)</li>-->
      <!--                </ul>-->
      <!--                <img src="/assets/mind-blown-full-node.png" alt="Mind blown meme"/>-->

      <!--                <h3>Gather information about the next block, this is called the <em>Block Header</em></h3>-->
      <!--                <ul>-->
      <!--                  <li>Version of bitcoin protocol</li>-->
      <!--                  <li>Previous block hash</li>-->
      <!--                  <li>Merkle Root</li>-->
      <!--                  <li>Timestamp</li>-->
      <!--                  <li>Record of current Difficulty called <em>Bits</em></li>-->
      <!--                  <li>A number used only once, called a <em>Nonce</em></li>-->
      <!--                </ul>-->
      <!--              </b-card-text>-->
      <!--              </b-card>-->
      <!--            </b-col>-->
      <!--          </b-row>-->
      <!--        </b-container>-->
      <!--      </div>-->

      <!--      <div id="mining" class="section">-->
      <!--        <b-container class="vh-100">-->
      <!--          <b-row align-v="center" class="vh-100">-->
      <!--            <b-col>-->
      <!--              <b-card title="Mining" align-v="center" class="mb-2">-->
      <!--                <b-card-text>-->
      <!--                  The goal of the miner is to find the ID of the next block from the block header.-->
      <!--                  This would be a trivial task if not for the difficulty requirement.-->

      <!--                  The block id is simply a hash of the block header.-->
      <!--                  The a hash is psuedo-random, as one cannot predict the output, but the same input always produces-->
      <!--                  the same output.-->
      <!--                  <ol>-->
      <!--                    <li>Gather recent, valid transactions, usually favoring those with the highest transaction fee.(Mempool)</li>-->
      <!--                    <li>Add a transaction that awards transaction feeds to the miner, as well as newly minted Bitcoin as per the award protocol</li>-->
      <!--                    <li>Organize transactions into a Merkle tree to compute the <em>Merkle Root</em>.</li>-->
      <!--                  </ol>-->
      <!--                </b-card-text>-->
      <!--              </b-card>-->
      <!--            </b-col>-->
      <!--          </b-row>-->
      <!--        </b-container>-->
      <!--      </div>-->

      <div id="mine_by_hand" class="section">
        <b-container class="vh-100">
          <b-row align-v="center" class="vh-100">
            <b-col>
              <h3>Mine by Hand</h3>
              <b-card id="raw_block_wrapper">
                <b-table id="block" :items="block"/>
              </b-card>

              <br/>
              <b-form >
                <!--                    <b-form-group>-->
                <!--                      <b-form-input id="block_search_input" type="text" placeholder="Look up a block by height or by id (hash)" />-->
                <!--                      <b-button @click="onSearch" variant="primary">Search</b-button>-->
                <!--                    </b-form-group>-->
                <b-form-group>
                  <b-form-input id="nonce_input" type="number" default="0" placeholder="Guess a nonce" />

                  <b-button @click="onTry" variant="primary" >Try</b-button>
                  <b-button @click="onInc" variant="secondary">Increment</b-button>
                  <b-button @click="onReset" variant="danger">Reset</b-button>
                </b-form-group>
              </b-form>

              <b-table id="encoding" striped hover :items="encodingTable"/>

              <b-button @click="onEncoding" variant="primary">Encoding</b-button>

              <div>
                <canvas id="graph" style="border: 1px solid"></canvas>
              </div>

              <!--              <div>-->
              <!--                Thanks to <a href="https://learnmeabitcoin.com">learnmeabitcoin.com</a> for technical explanations of serialization.-->
              <!--                Thanks to <a href="https://blockchaindemo.io">blockchaindemo.io</a> for inspiration on gui.-->
              <!--              </div>-->
            </b-col>
          </b-row>
        </b-container>
      </div>

    </full-page>
  </div>
</template>

<script>

//
//const intToHex = (val) => Number(val).toString(16).padStart(8, '0');
//
//const swapEndian = (val) => {
//  const str = String(val);
//
//  const result = [];
//  let len = str.length - 2;
//
//  while (len >= 0) {
//    const pair = str.substr(len, 2);
//    result.push(pair);
//    len -= 2;
//  }
//  return result.join('');
//};
//
// const sha256d = (hexStr) => {
//   let hash = this.wasm.sha256_of_hex_str(hexStr);
//   hash = this.wasm.sha256_of_hex_str(hash);
//   return swapEndian(hash);
// };
//
// const serializeBlockHeader = (
//     version,
//     previousBlockhash,
//     merkleRoot,
//     timestamp,
//     bits,
//     nonce,
// ) => {
//   // In case of Genesis block returning prev hash as null.
//   const prevBlockhash = previousBlockhash || ''.padStart(64, '0');
//
//   return swapEndian(intToHex(version))
//       + swapEndian(prevBlockhash)
//       + swapEndian(merkleRoot)
//       + swapEndian(intToHex(timestamp))
//       + swapEndian(intToHex(bits))
//       + swapEndian(intToHex(nonce));
// };
//
// const calcHash = (block, nonce) => {
//   const blockHeader = serializeBlockHeader(
//       block.version,
//       block.previousblockhash,
//       block.merkle_root,
//       block.timestamp,
//       block.bits,
//       nonce,
//   );
//
//   return sha256d(blockHeader);
// };

// function formatBlock(block) {
//   const date = new Date(block.timestamp * 1000);
//   const time = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
//
//   return {
//     'Id (hash)': block.id,
//     Height: block.height,
//     Version: block.version,
//     'Previous Block Hash': block.previousblockhash,
//     'Merkle Root': block.merkle_root,
//     Time: time,
//     Bits: block.bits,
//     Nonce: block.nonce,
//   };
// }
//
// function calcTarget(difficulty) {
//   const targetMax = 0x00000000ffff0000000000000000000000000000000000000000000000000000;
//   return targetMax / Number(difficulty);
// }

export default {
  name: 'app',
  data () {
    return {
      fullPageOptions: {
        licenseKey: 'YOUR_KEY_HERE',
        afterLoad: this.afterLoad,
        scrollOverflow: false,
        scrollBar: false,
        menu: '#menu',
        navigation: true,
        sectionsColor: ['#41b883', '#ff5f45', '#0798ec', '#fec401']
      },
      encodingTable: [
        {Encoding: "Hexadecimal", base: 16, value: "0234"},
        {Encoding: "Binary", base: 2, value: "0101"},
        {Encoding: "Decimal", base: 10, value: "0101"},
        {Encoding: "Exponential", base: 10, value: "0101"},
      ],
      block: [
        { Field: "Height", value: "363,366"},
        { Field: "Id", value: "000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce"},
        { Field: "Previous Block", value: "000000000000000010c545b6fa3ef1f7cf45a2a8760b1ee9f2e89673218207ce"},
        { Field: "Merkle Root", value: "9d3cb87bf05ebae366b4262ed5f768ce8c62fc385c3886c9cb097647b04b686c"},
        { Field: "Version", value: "01"},
        { Field: "Time", value: "1435766771"},
        { Field: "Bits", value: "404111758"},
        { Field: "Nonce", value: "??????"},
      ],
      wasmPromise: null,
      wasm: null,
    }
  },

  methods: {
    mounted() {
      this.wasmPromise = import("wasm_sha256_from_hex_str")
      .then((wasm) => {
        this.wasm = wasm;
      })
      .catch((err) => alert("Failed to load wasm module" + err));
    },
    onSearch(e) {
      e.preventDefault();
      console.log(e.target);
    },
    onTry(e) {
      e.preventDefault();

      // start = start === 0 ? new Date().getTime() : start;
      // tries += 1;
      //
      // const nonce = document.getElementById('nonce_input').valueOf().value;
      //
      // const block = {
      //   id: "000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce",
      //   height: 363366,
      //   version: 2,
      //   timestamp: 1435766771,
      //   tx_count: 494,
      //   size: 286494,
      //   weight: 1145976,
      //   merkle_root: "9d3cb87bf05ebae366b4262ed5f768ce8c62fc385c3886c9cb097647b04b686c",
      //   previousblockhash: "000000000000000010c545b6fa3ef1f7cf45a2a8760b1ee9f2e89673218207ce",
      //   mediantime: 1435763435,
      //   nonce: 2892644888,
      //   bits: 404111758,
      //   difficulty: 49402014931
      // };
      const hash = this.sha256d("a0");

      console.log(hash);
      //
      // const encodings = {
      //   hex: hash,
      //   binary: BigInt(`0x${hash}`).toString(2).padStart(256, '0'),
      //   scientific: Number(`0x${hash}`).toExponential(),
      //   decimal: BigInt(`0x${hash}`).toLocaleString('en-US'),
      // };
      //
      // graph.guesses.push({
      //   xRatio: 0,
      //   yRatio: parseInt(hash, 16) / 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff,
      //   encodings,
      // });
      //
      // generateTable(document.querySelector('table#encoding'), {
      //   Hexadecimal: encodings.hex,
      //   // Fold binary.
      //   Binary: encodings.binary.replace(
      //       /(\d{64})(\d{64})(\d{64})(\d{64})/,
      //       '$1\n↳$2\n↳$3\n↳$4',
      //   ),
      //   Scientific: encodings.scientific,
      //   Decimal: encodings.decimal,
      // });
    },
    onInc(e) {
      e.preventDefault();
      console.log(e.target);
    },
    onReset(e) {
      e.preventDefault();
      console.log(e.target);
    },
    onEncoding(e) {
      e.preventDefault();
      console.log(e.target);
    },
    sha256d(hexStr) {
      let hash = this.wasm.sha256_of_hex_str(hexStr);
      hash = this.wasm.sha256_of_hex_str(hash);
      // return swapEndian(hash);
      return hash;
    }
  }
}
</script>

<style>
@font-face {
  font-family: "Fira Mono";
  src: url("/assets/FiraMono-Regular.ttf");
}
#app {
  font-size: 16px;
  font-family: 'Fira Mono', monospace;
}
#raw_block_wrapper {
  overflow-x: scroll;
}
</style>
