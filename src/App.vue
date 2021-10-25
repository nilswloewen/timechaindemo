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

              <b-card id="block_header_wrapper" title="Block Header">
                <b-list-group id="block_height_and_id">
                  <!-- Height -->
                  <b-list-group-item class="list-field border-bottom-0"> Height </b-list-group-item>
                  <b-list-group-item class="list-value">
                    <b-form-input @change="onBlockHeightChange"
                                  id="block_height_input"
                                  type="number"
                                  :value="this.rawBlock.height"
                                  :max="this.blockHeightMax"
                                  :min="0"
                    />
                  </b-list-group-item>

                  <!-- Id -->
                  <b-list-group-item class="list-field border-bottom-0"> Id </b-list-group-item>
                  <b-list-group-item class="list-value"> {{ this.rawBlock.id }} </b-list-group-item>
                </b-list-group>

                <!--                <b-list-group id="block_serialized">-->
                <!--                  <template v-for="item in this.blockList">-->
                <!--                    <b-list-group-item :key="item.field" class="list-field border-bottom-0"> {{ item.field }} </b-list-group-item>-->
                <!--                    <b-list-group-item :key="item.value" class="list-value"> {{ item.value }} </b-list-group-item>-->
                <!--                  </template>-->
                <!--                </b-list-group>-->

                <b-list-group id="block_serialized">
                  <b-list-group-item class="list-field border-bottom-0"> Nonce </b-list-group-item>
                  <b-list-group-item class="list-value">
                    <b-form-input  @change="onNonceChange"
                                   id="nonce_input"
                                   type="number"
                                   :value="this.nonce"
                                   class="d-inline-block"
                    />
                    <b-button @click="onIncrementNonce" class="d-inline-block">+</b-button>
                    <b-button @click="onShowNonce" class="d-inline-block">Show</b-button>
                  </b-list-group-item>
                </b-list-group>
              </b-card>

              <!--              <b-card title="Algorithm">-->
              <!--                <b-list-group id="block_serialized">-->
              <!--                  <b-list-group-item>-->
              <!--                    <p>1. Serialize block header and nonce.</p>-->
              <!--                    <p>{{ this.serializedHeader }}</p>-->
              <!--                  </b-list-group-item>-->
              <!--                  <b-list-group-item>-->
              <!--                    <p>2. Calculated hash of header.</p>-->
              <!--                    <p>{{ this.hash }}</p>-->
              <!--                  </b-list-group-item>-->
              <!--                  <b-list-group-item>-->
              <!--                    <p>3. Compare hash against target. </p>-->
              <!--                    <p> - If greater: Try Again!</p>-->
              <!--                    <p> - If less: You Win!</p>-->
              <!--                  </b-list-group-item>-->
              <!--                </b-list-group>-->
              <!--              </b-card>-->

              <b-card title="Legend" id="legend">
                <b-list-group>
                  <!--  Max -->
                  <b-list-group-item class="list-field border-bottom-0"> Max </b-list-group-item>
                  <b-list-group-item class="list-value">{{ this.hashMax[this.encoding] }} </b-list-group-item>
                  <!-- Target -->
                  <b-list-group-item class="list-field border-bottom-0"> Target </b-list-group-item>
                  <b-list-group-item class="list-value">{{ this.target[this.encoding] }} </b-list-group-item>
                  <!-- Hash -->
                  <b-list-group-item class="list-field border-bottom-0"> Hash </b-list-group-item>
                  <b-list-group-item class="list-value">{{ this.hash[this.encoding] }} </b-list-group-item>
                </b-list-group>

                <b-button @click="onChangeEncoding" variant="primary">Encoding</b-button>
              </b-card>
              <b-card>
                <canvas id="graph"/>
              </b-card>

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
  import Mempool from './services/Mempool.js';
  import Graph from './js/Graph';

  export default {
    data () {
      return {
        fullPageOptions: {
          licenseKey: '2C8168FC-415648B7-B94C4003-80F51EAC',
          afterLoad: this.afterLoad,
          scrollOverflow: false,
          scrollBar: false,
          menu: '#menu',
          navigation: true,
          sectionsColor: ['#41b883', '#ff5f45', '#0798ec', '#fec401']
        },
        wasm: { sha256_of_hex_str: () => {} },
        mempool: new Mempool(),

        startTime: 0,
        tries: 0,

        blockHeight: 0,
        blockHeightMax: 0,

        nonce: 0,
        hash: {decimal: 0, binary: 0, hexadecimal: 0, exponential: 0},
        rawBlock: Object,
        blockList: Array,
        graph: Object,

        hashMax: Object,
        target: Object,
        encoding: 'decimal',
      }
    },

    async mounted() {
      this.startTime = new Date().getTime();
      this.blockHeight = await this.mempool.getHeightOfLatestBlock();
      this.blockHeightMax = this.blockHeight;
      await this.setBlock();

      this.graph = this.initGraph();
      this.calcGraph();
      this.drawGraph();

      this.setHashMax();
      this.setTarget();

      import("wasm_sha256_from_hex_str")
      .then((wasm) => {
        this.wasm = wasm;
      })
      .catch((err) => alert("Failed to load wasm module" + err));
    },

    watch: {
      async blockHeight() {
        await this.setBlock();
      },
      nonce() {
        this.onNonceChange(this.nonce);
      }
    },

    methods: {
      setHashMax() {
        this.hashMax = this.encode(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn);
        this.hashMax.binary = ''.padStart(256, '1');
        this.hashMax.hexadecimal = ''.padStart(64, 'f');
      },

      setTarget() {
        const targetMax = 0x00000000ffff0000000000000000000000000000000000000000000000000000n;
        const target = Number(targetMax) / Number(this.rawBlock.difficulty);
        this.target = this.encode(target);
      },

      async setBlock( ) {
        const id = await this.mempool.getBlockIdFromHeight(this.blockHeight)
        this.rawBlock = await this.mempool.getBlockById(id);

        const date = new Date(this.rawBlock.timestamp * 1000);
        const time = new Intl.DateTimeFormat('en-US', {dateStyle: 'medium', timeStyle: 'long'}).format(date);

        this.blockList = [
          {field: "Version", value: this.rawBlock.version},
          {field: "Previous this.rawBlock", value: this.rawBlock.previousblockhash || '0'.padStart(64, '0')},
          {field: "Merkle Root", value: this.rawBlock.merkle_root},
          {field: "Time", value: time},
          {field: "Bits", value: this.rawBlock.bits},
        ];
      },

      encode(val) {
        // eslint-disable-next-line no-undef
        const bigInt = BigInt(val);
        return {
          bigInt,
          binary: bigInt.toString(2).padStart(256, '0'),
          decimal: bigInt.toLocaleString('en-US').padStart(103, '000,'),
          exponential: Number(bigInt).toExponential(),
          hexadecimal: bigInt.toString(16).padStart(64, '0'),
        }
      },
      onBlockHeightChange(value) {
        this.blockHeight = Number(value);
      },
      onNonceChange(nonce) {
        this.nonce = nonce;
        this.startTime = this.startTime === 0 ? new Date().getTime() : this.startTime;
        this.tries += 1;

        let hash = this.calcHash(this.rawBlock, nonce);
        hash = this.encode(`0x${hash}`);
        this.hash = hash;

        this.graph.guesses.push({
          xRatio: 0,
          yRatio: parseInt(this.hash.hexadecimal, 16) / Number(this.hashMax.bigInt),
          hash
        });
      },
      onIncrementNonce() {
        this.nonce += 1;
      },
      onShowNonce() {
        this.nonce = this.rawBlock.nonce;
        this.encoding = 'decimal';
      },
      onChangeEncoding(e) {
        switch (this.encoding) {
          case 'hexadecimal':
            this.encoding = 'decimal';
            e.target.innerText = 'Decimal';
            break;
          case 'decimal':
            this.encoding = 'exponential';
            e.target.innerText = 'Exponent';
            break;
          case 'exponential':
            this.encoding = 'binary';
            e.target.innerText = 'Binary';
            break;
          case 'binary':
          default:
            this.encoding = 'hexadecimal';
            e.target.innerText = 'Hexadecimal';
            break;
        }
        this.graph.encoding = this.encoding;
      },

      sha256d(hexStr) {
        let hash = this.wasm.sha256_of_hex_str(hexStr);
        hash = this.wasm.sha256_of_hex_str(hash);
        return this.swapEndian(hash);
      },

      intToHex(val) {
        return Number(val).toString(16).padStart(8, '0');
      },

      swapEndian(val) {
        const str = String(val);

        const result = [];
        let len = str.length - 2;

        while (len >= 0) {
          const pair = str.substr(len, 2);
          result.push(pair);
          len -= 2;
        }
        return result.join('');
      },

      serializeBlockHeader(
          version,
          previousBlockHash,
          merkleRoot,
          timestamp,
          bits,
          nonce,
      ) {
        // In case of Genesis block returning prev hash as null.
        previousBlockHash = previousBlockHash || ''.padStart(64, '0');

        return this.swapEndian(this.intToHex(version))
            + this.swapEndian(previousBlockHash)
            + this.swapEndian(merkleRoot)
            + this.swapEndian(this.intToHex(timestamp))
            + this.swapEndian(this.intToHex(bits))
            + this.swapEndian(this.intToHex(nonce));
      },

      calcHash(block, nonce) {
        const blockHeader = this.serializeBlockHeader(
            block.version,
            block.previousblockhash,
            block.merkle_root,
            block.timestamp,
            block.bits,
            nonce,
        );

        return this.sha256d(blockHeader);
      },

      initGraph() {
        const canvasMinWidth = 965;
        const viewPortWidth = document.documentElement.clientWidth - 50;
        const canvasWidth = viewPortWidth > canvasMinWidth ? viewPortWidth : canvasMinWidth;
        return new Graph('graph', 500, canvasWidth);
      },
      calcGraph() {
        this.graph.calcTicks();
        this.graph.calcGuesses();
        setTimeout(this.calcGraph, 25);
      },
      drawGraph() {
        this.graph.clear();
        this.graph.drawTicks();
        this.graph.drawGuesses();
        this.graph.drawEndCaps();

        // Hashes per second.
        const elapsed = new Date().getTime() - this.startTime;
        const hashesPerSecond = (this.tries / elapsed) * 1000;
        const xLabel =  String(hashesPerSecond).substr(0, 4);
        this.graph.drawAxis(`${xLabel} hashes per second`);

        this.graph.drawAxisLabels();

        const yRatio = this.target.num / Number(this.hashMax.bigInt);
        this.graph.drawTarget(yRatio);

        window.requestAnimationFrame(this.drawGraph);
      },


    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Fira%20Code:wght@300..700&display=swap');
  #app {
    font-size: 16px;
    font-family: 'Fira Code', monospace;
  }
  #legend {
    word-wrap: normal;
    overflow-x: auto;
  }
  #legend .list-group {
    width: 2480px;
  }
  #nonce_input {
    width: 50%;
    margin-right: 1em;
  }
  .card,
  .card-body .list-group {
    margin-top: .5em;
    margin-bottom: .5em;
  }
  #block_height_input {
    padding-top: 0.1em !important;
    padding-bottom: 0.1em !important;
    padding-left: 0.4em !important;
  }
  .list-field {
    padding-bottom: 0 !important;
    font-weight: lighter;
    font-size: .8em;
  }
  #graph {
    height: 100%;
    width: 100%;
  }
</style>

