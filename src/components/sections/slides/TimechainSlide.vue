<template>
<Page data-anchor="timechain" first prev-section-btn slide>
  <h1>Timechain</h1>

  <b-card class="quote_card">
    <q>The only way to find a valid proof-of-work is by making a lot of guesses,
      and making a single guess takes a little bit of time. The probabilistic
      sum of these guesses is what builds up the timechain that is Bitcoin.</q>
    -
    <Link href="https://dergigi.com/2021/01/14/bitcoin-is-time/">Gigi</Link>
  </b-card>

  <p>
    We've shown that by adjusting the target it becomes more or less difficult to
    find a valid hash. When more guesses are required, more <b>time</b> is required.
    The difficulty can be expressed as the number of guesses per unit of time required
    to find a valid hash.
  </p>

  <b-card class="definition_card">
    <h4>hashrate (n.)</h4>
    <hr>
    (computing, cryptocurrency) The number of hashes that a mining computer can calculate in a given
    period of time, usually a second.
    <hr>
    Hashes per second (H/s)
  </b-card>

  <p>
    Remember, if a miner finds a block they are rewarded with bitcoin, so the incentive is
    to mine as many blocks as possible to increase their profits. Not only are their computers
    running 24/7, to increase their chance of success miners find ways to increase their hashrate.
  </p>

  <p>
    This leads to a global arms race as Bitcoin mining is a competition that is open to anyone, anywhere.
    As each miner upgrades their hardware to increase their hashrate, every other miner must do the same
    or else the probability of their success decreases.
  </p>

  <p>
    To ensure that the timechain only grows at steady rate regardless of computing power, we can adjust
    the target in relation to hashrate.
  </p>

  <b-card class="definition_card">
    <h4>Timechain (n.)</h4>
    <hr>
    A blockchain that grows at a regulated time interval, regardless of hashrate.
  </b-card>
</Page>
</template>

<script>
import Page from '@/components/Page';
import Link from '@/components/Link';

export default {
  components: {
    Link,
    Page,
  },
};
</script>
