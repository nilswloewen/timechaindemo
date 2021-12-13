<template>
<div id="pow_section" class="section">
  <Page first slide prev-section-btn data-anchor="pow">
    <h1> Mining / Proof-of-Work </h1>

    <p>
      Mining is the process of adding new blocks to the blockchain. The name comes from the idea that
      if you work hard enough, you will be rewarded with 'digital gold' aka Bitcoin.
    </p>

    <p>
      Every time a miner successfully adds a block to the blockchain they are given a reward of newly
      minted bitcoin. The reward started at <span style="color: #f79413;">50₿</span> per block and the amount gets halved every four years. This is why
      Bitcoin has a <Link href="https://en.bitcoin.it/wiki/Controlled_supply">limited supply</Link>.
    </p>

    <p>
      This demo should show you why Bitcoin's monetary policy is far more rational than the Federal Reserve,
      who simply say <Link href="https://moneyprintergobrrr.com">Money Printer Go BRRR!</Link>
    </p>

    <hr>

    <p>
      In the previous example of a blockchain, every block hash was considered valid.
      To make mining difficult, Bitcoin requires that a block hash will only be valid if it's numerical value
      is less than a pre-determined <b>target</b>.
    </p>

    <p>
      Because the hash of each block will probably not meet the new criteria,
      we will add one new field to the block called a <b>nonce</b>.
    </p>

    <b-card class="definition_card">
      <h4><Link href="https://www.etymonline.com/word/nonce">nonce (n.)</Link></h4>
      <hr>
      In phrase 'for the nonce' (c. 1200) "for a special occasion, for a particular purpose"
      <hr>
      In cryptography it is said to be shorthand for <br>'A number used once'
    </b-card>

    <p>
      If the hash of the block is invalid, the block will be rejected and we will
      try again with a new nonce. It may take many, many tries to find a valid
      hash, which is why this system is called <b>Proof-of-Work</b>.
    </p>

    <p>
      In this system we are essentially using the hash function as if it were a random number generator and then saying that
      only some of these random numbers are acceptable. Though it's important to remember that a hash is neither random
      nor a number - it's just a string of bits we interpret as a number.
      The randomness comes from the nonce that we use as input in the hash function.
    </p>

    <b-card no-body class="img_card">
      <img alt="That's just a dice game with extra steps!"
           class="card-img" src="/assets/backgrounds/rick_dice_game.jpg"/>
    </b-card>

    <TldrCard title="tl;dr | Mining Algorithm">
      <ol>
        <li> Pick a random number (<b>nonce</b>)</li>
        <li> Calculate <b>hash</b> of ( data & <b>nonce</b> )</li>
        <li> If <b>hash</b> is less than the <b>target</b>
          <ul>
            <li> The hash is valid and the block will be added to the blockchain!</li>
            <li> If not &mdash; go back to step 1 and try again!</li>
          </ul>
        </li>
      </ol>
    </TldrCard>

<!--    <b-card class="quote_card">-->
<!--      <q>The network timestamps transactions by hashing-->
<!--        them into an ongoing chain of hash-based proof-of-work, forming a-->
<!--        record that cannot be changed without redoing the proof-of-work.</q>-->
<!--      <br> - <Link href="https://bitcoin.org/bitcoin.pdf">Satoshi Nakamoto</Link>-->
<!--    </b-card>-->
  </Page>

  <Page slide data-anchor="target">
    <h1> Target </h1>

    <p>
      Because we are starting this demo by only looking at the first 2 digits of the hash of
      each block, the possible hash values are between 00 and ff. Remember, a hash is just a number
      written in hexadecimal notation. In decimal notation the hash ff is 255. This means there are 256
      possible values between 00 and ff (0 to 255).
    </p>
    <p>For this section the target and block hashes will be in decimal notation instead of hexadecimal.</p>

    <p>
      The target is a movable value somewhere between the minimum and maximum that will be the
      cutoff for an acceptable hash. As the target goes down it becomes more difficult to find a winning hash.
    </p>

    <p>
      For now we will set the target to <b>15</b>, which means on average we will need to guess <b>17</b> times
        before finding a valid hash.
    </p>

    <Target v-on:updateTarget="updateTarget"
            hide-range
            :avgHashes="avgHashes"
            :denominator="denominator"
            :hash-max="hashMax"
            :localEncoding="encoding[activeEncoding]"
            :numerator="numerator"
            :probability="probability"
            :target="target"
            :targetMax="targetMax"/>
  </Page>

  <Page data-anchor="pow_blockchain" slide>
    <h1>Proof-of-work Blockchain</h1>

    <AddBlockButton :disable-add-block-btn="disableAddBlockBtn"
                    :encoding="encoding[activeEncoding]"
                    v-on:add-block="addBlock"
                    v-on:reset-blocks="resetBlocks"/>

    <div id="blockchainPow" class="blockchain_wrapper mt-4">
      <BlockCard v-for="(block, index) in this.blocks" :key="index"
                 :block="block"
                 :index="index"
                 :local-encoding="encoding[activeEncoding]"
                 showData
                 showNonce
                 v-on:rotate-encoding="rotateEncoding"
                 v-on:mine-this-block="mineThisBlock"
                 v-on:update-data="updateData"/>
    </div>
  </Page>

  <div class="slide" data-anchor="pow_mining" id="pow_mining_slide">
    <div class="fp-bg"/>

    <Graph id="pow_canvas" :guesses="this.guesses" animate
           :target="this.target" :local-encoding="encoding[activeEncoding]"/>

    <div class="overlay">
      <b-container>
        <b-row>
          <b-col>
            <MiningControls
              :block="blocks[blockToMine]"
              :hash-max="hashMax"
              :index="blockToMine"
              :is-mining="isMining"
              :local-encoding="encoding[activeEncoding]"
              :target="target"
              :encoding-btn="false"
              interactive-nonce
              v-on:update-nonce="updateNonce"/>

            <SuccessMsg :block-height="blocks[blockToMine].height"
                        :is-hash-valid="blocks[blockToMine].isHashValid"
                        :avg-hashes="avgHashes"
                        :num-of-tries="guesses.length"/>

            <div class="nav_btn_mining_wrapper">
              <b-button size="sm" class="nav_btn previous" @click="previousSlide">
                <b-icon-arrow-left/> Prev
              </b-button>

              <b-button size="sm" class="nav_btn next_slide mining" @click="nextSlide">
                Next <b-icon-arrow-right/>
              </b-button>
            </div>

          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>

  <Page last slide next-section-btn data-anchor="adjustable_target">
    <h1>Proof-of-work Review</h1>

    <p>Take a minute to play with these new concepts before moving forward.</p>
    <p>You can use the notation button to view the target and hash in hexadecimal format.</p>

    <p>
      Try changing the target to see how the mining difficulty changes.
      Then go back to the previous slides to try out the new target yourself.
    </p>

    <Target v-on:updateTarget="updateTarget"
            enable-change-encoding
            :avgHashes="avgHashes"
            :denominator="denominator"
            :hash-max="hashMax"
            :localEncoding="encoding[activeEncoding]"
            :numerator="numerator"
            :probability="probability"
            :target="target"
            :targetMax="targetMax"/>
  </Page>
</div>
</template>

<script>
import AddBlockButton from '@/components/controls/AddBlockButton.vue';
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import EncodingMixin from '@/mixins/EncodingMixin';
import Graph from '@/components/Graph';
import MiningControls from '@/components/controls/MiningControls.vue';
import Page from '@/components/Page.vue';
import SuccessMsg from '@/components/controls/SuccessMsg';
import Target from '@/components/controls/Target.vue';
import TargetMixin from '@/mixins/TargetMixin';
import TldrCard from '@/components/cards/TldrCard';
import Link from '@/components/Link';

export default {
  mixins: [
    BlockchainMixin,
    EncodingMixin,
    TargetMixin
  ],
  components: {
    Link,
    TldrCard,
    AddBlockButton,
    BlockCard,
    Graph,
    MiningControls,
    Page,
    Target,
    SuccessMsg
  },
  data() {
    return {
      activeEncoding: 1,
      blockToMine: 0,
      guesses: [],
      isMining: false
    };
  }

};
</script>

<style>
.overlay {
  position: fixed;
  top: 0;
  width: 100%;
  padding-top: 10vh;
}

#pow_mining_slide .mining_controls {
  max-width: 305px;
}

</style>
