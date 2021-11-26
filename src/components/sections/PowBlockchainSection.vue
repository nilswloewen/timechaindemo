<template>
  <div id="pow_section" class="section">
    <Page data-anchor="pow" slide>
      <h1> Mining </h1>

      <p>
        In the previous example of a simple, non-proof-of-work blockchain every block hash was considered valid.
      </p>
      <p>
        To make mining difficult, a hash will only be considered valid if
        it is interpreted as a number that is less than a self-adjusting <b>target</b>.
      </p>

      <b-card>
        <q>We propose a solution to the double-spending problem using a
          peer-to-peer network. The network timestamps transactions by hashing
          them into an ongoing chain of hash-based proof-of-work, forming a
          record that cannot be changed without redoing the proof-of-work.</q>
        <br> - <a href="https://bitcoin.org/bitcoin.pdf">Satoshi Nakamoto</a>
      </b-card>

      <p>
        Because a hash of the data and previous hash will not meet the new criteria
        we will add one new field to the block called a <b>Nonce</b>.
      </p>


      <b-card>
        <h4 class="text-left">nonce (n.)</h4>
        <hr>
        In phrase 'for the nonce' (Middle English for þe naness, c. 1200)
        "for a special occasion, for a particular purpose"
        <hr>
        In cryptography it is said to be shorthand for <br>'A number used only once'
      </b-card>

      <b-card no-body>
        <b-card-header header-bg-variant="info">
          Mining Algorithm
        </b-card-header>
        <b-card-body>
          <ol>
            <li> Pick a random <b>nonce</b> </li>
            <li> Calculate <b>hash</b>: sha256d ( data + <b>nonce</b> ) </li>
            <li> If <b>hash</b> is less than <b>target:</b>
              <ul>
                <li>
                  The hash is considered valid and the block will be added to the blockchain!
                </li>
                <li> If not - go back to step 1 try again! </li>
              </ul>
            </li>
          </ol>
        </b-card-body>
      </b-card>

      <p>
        The nonce is not a specific number, it is a number within the range of 0 to target - 1.
      </p>
      <p>
        By adding a random nonce to the block we are essentially treating the hash function as a
        random number generator. However, a hash is neither random nor a number - it is simply a string of bits.
      </p>
    </Page>

    <Page data-anchor="target" slide
          encoding-btn
          :active-encoding="activeEncoding"
          :encoding="encoding"
          v-on:rotate-encoding="rotateEncoding"
          v-on:update-active-encoding="updateActiveEncoding">

      <h1> Target </h1>
      <p>
        Because we are starting this demo by only looking at the first 2 digits of the hash of
        each block, the maximum value of a hash is 255 and the minimum value is 0.
      </p>

      <p>
        The target is a movable value somewhere between the min and max that will be the
        cutoff for an acceptable hash. <b>Try moving the target to see how the probabilities change.</b>
      </p>
      <p>
        As the target goes down it becomes more difficult to find a winning hash.
      </p>

      <Target v-on:updateTarget="updateTarget" full
              v-on:real-target-max="realTargetMax"
              :avgHashes="avgHashes"
              :denominator="denominator"
              :hash-max="hashMax"
              :localEncoding="encoding[activeEncoding]"
              :numerator="numerator"
              :probability="probability"
              :target="target"
              :targetMax="targetMax"/>
    </Page>

    <Page data-anchor="leading_zeros" slide>
      <h1>Leading Zeros</h1>

      <p>
        It is a common misconception that a block has is required to have a certain
        amount of leading zeros.
      </p>

      <p>
        <q>The proof-of-work involves scanning for a value that when hashed, such as with SHA-256, the
          hash begins with a number of zero bits. The average work required is exponential in the number
          of zero bits required and can be verified by executing a single hash.</q>
        <br> - <a href="https://bitcoin.org/bitcoin.pdf">Satoshi Nakamoto</a>
      </p>
    </Page>

    <Page data-anchor="pow_blockchain" slide
          encoding-btn
          :active-encoding="activeEncoding"
          :encoding="encoding"
          v-on:rotate-encoding="rotateEncoding"
          v-on:update-active-encoding="updateActiveEncoding">

      <h1>Proof-of-work Blockchain</h1>

      <AddBlockButton :disable-add-block-btn="disableAddBlockBtn"
                      v-on:add-block="addBlock"
                      v-on:reset-blocks="resetBlocks"/>

      <div id="blockchainPow" class="text-center mt-4">
        <BlockCard v-for="(block, index) in this.blocks" :key="index"
                   :block="block"
                   :hex-digits="hexDigits"
                   :index="index"
                   :local-encoding="encoding[activeEncoding]"
                   showData
                   showNonce
                   v-on:mine-this-block="mineThisBlock"
                   v-on:update-data="updateData" />
      </div>
    </Page>

    <div class="slide" data-anchor="pow_mining" id="pow_mining_slide">
      <div class="fp-bg"/>
      <EncodingButton :active-encoding="activeEncoding"
                      :encoding="encoding"
                      v-on:update-active-encoding="updateActiveEncoding"
                      v-on:rotate-encoding="rotateEncoding" />

      <Graph id="pow_canvas" :guesses="this.guesses" :target="this.target" :local-encoding="encoding[activeEncoding]"/>
      <MiningControls
        :block="blocks[blockToMine]"
        :hash-max="hashMax"
        :index="blockToMine"
        :is-mining="isMining"
        :local-encoding="encoding[activeEncoding]"
        :target="target"
        v-on:start-mining="startMining"
        v-on:update-nonce="updateNonce" />
    </div>
  </div>
</template>

<script>
import AddBlockButton from '@/components/controls/AddBlockButton.vue';
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import EncodingButton from '@/components/controls/EncodingButton.vue';
import EncodingMixin from '@/mixins/EncodingMixin';
import Graph from '@/components/Graph';
import MiningControls from '@/components/controls/MiningControls.vue';
import Page from '@/components/Page.vue';
import Target from '@/components/controls/Target.vue';
import TargetMixin from '@/mixins/TargetMixin';

export default {
  mixins: [
    BlockchainMixin,
    EncodingMixin,
    TargetMixin,
  ],
  components: {
    AddBlockButton,
    BlockCard,
    EncodingButton,
    Graph,
    MiningControls,
    Page,
    Target,
  },
  data() {
    return {
      activeEncoding: 1,
      blockToMine: 0,
      encoding: ['binary', 'decimal', 'hexadecimal'],
      guesses: [],
      isMining: false,
    };
  },
};
</script>
