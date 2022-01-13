<template>
<Page data-anchor="pow" first prev-section-btn slide>
  <h1> Mining / Proof-of-Work </h1>

  <p>
    Mining is the process of adding new blocks to the blockchain. The name comes from the idea that
    if you work hard enough, you will be rewarded with 'digital gold' aka Bitcoin.
  </p>

  <p>
    Every time a miner successfully adds a block to the blockchain they are given a reward of newly
    minted bitcoin. The reward started at <span style="color: #f79413;">50₿</span> per block and the amount gets halved
    every four years. This is why
    Bitcoin has a
    <Link href="https://en.bitcoin.it/wiki/Controlled_supply">limited supply</Link>
    .
  </p>

  <p>
    This demo should show you why Bitcoin's monetary policy is far more rational than the Federal Reserve,
    who simply say
    <Link href="https://moneyprintergobrrr.com">Money Printer Go BRRR!</Link>
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
    <h4>
      <Link href="https://www.etymonline.com/word/nonce">nonce (n.)</Link>
    </h4>
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
    In this system we are essentially using the hash function as if it were a random number generator and then saying
    that
    only some of these random numbers are acceptable. Though it's important to remember that a hash is neither random
    nor a number - it's just a string of bits we interpret as a number.
    The randomness comes from the nonce that we use as input in the hash function.
  </p>

  <b-card class="img_card" no-body>
    <img alt="That's just a dice game with extra steps!"
         class="card-img" height="auto" src="/assets/backgrounds/rick_dice_game.webp" width="555"/>
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
</Page>
</template>

<script>
import Link from '@/components/Link';
import Page from '@/components/Page';
import TldrCard from '@/components/cards/TldrCard';

export default {
  components: { Link, TldrCard, Page },
};
</script>
