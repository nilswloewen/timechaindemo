<template>
<Page data-anchor="real_world_hashrate" slide>
  <h1> Real-World Hashrate </h1>

  <h3>ASIC Miners</h3>
  <p>
    When Bitcoin was first discovered, miners were using home computers and laptops to mine. Over the years
    new methods have been found to optimize hashrate to increase miner's profits. Nowadays it's impractical
    to use a home computer for mining because specialized computers have been created that can only mine
    bitcoin and they do it well, these are called ASIC (Application-Specific Integrated Circuit) miners.
  </p>

  <p>
    The
    <Link href="https://shop.bitmain.com/promote/antminer_s9i_asic_bitcoin_miner/overview">Antminer S9i</Link>
    is one of the most popular ASICs on the market.

    The hashrate of just one of these units is ~13 TeraHashes per second, or 13,000,000,000,000 <sub>H/s</sub>.
  </p>

  <InfoCard title="Antminer S9i">
    <img alt="Antminer S9" class="card-img" height="auto" src="/assets/antminerS9.jpeg" width="556"/>
  </InfoCard>

  <hr>
  <h3>Mining Farms</h3>

  <p>
    You may have seen photos of massive warehouses of electronics and blinking lights
  </p>

  <InfoCard title="Mining Farm">
    <img alt="Mining Farm" class="card-img" height="auto" src="/assets/mining_farm.jpeg" width="556"/>
  </InfoCard>

  <p>
    Compare the hashrate of your device to the
    global hashrate of the entire Bitcoin network. Mining is a global competition to see who can
    find a winning block first. If you were to mine Bitcoin with your device this is the
    phenomenal computing power you'd be up against.
  </p>

  <hr>

  <h2>Mining Pools</h2>

  <p>
    Because the probability of individual miners finding a block is so small compared to the global
    competition, miners sometimes choose to work as a group to increase the group's chance of a profit. These
    groups are called 'Mining Pools'. All the member's hashrates are pooled together and the profits are
    split based on the hashrate that each individual miner contributes to the pool.
  </p>

  <p>
    <Link href="https://slushpool.com/en/stats/btc/">SlushPool</Link>
    is the oldest Bitcoin mining pool and at the time of this writing their hashrate represents
    ~8 of the global hashrate, around ~7 ExaHashes per second.
  </p>

  <hr>

  <InfoCard id="hashrate_table" title="Hashrate Comparison">
    <div class="list label">Your Device</div>
    <div class="list value">~{{ this.yourDeviceHr }}<sub>H/s</sub></div>

    <div class="list label">Antminer S9</div>
    <div class="list value">13,000,000,000,000<sub>H/s</sub></div>

    <div class="list label">SlushPool</div>
    <div class="list value">7,000,000,000,000,000,000<sub>H/s</sub></div>

    <div class="list label">Global</div>
    <div class="list value">{{ this.globalHr }}<sub>H/s</sub></div>
  </InfoCard>
</Page>
</template>

<script>
import InfoCard from '@/components/cards/InfoCard';
import Page from '@/components/Page';
import Link from '@/components/Link';

export default {
  components: {
    Link,
    InfoCard,
    Page,
  },
  props: {
    globalHr: String,
    yourDeviceHr: Number,
  },
};
</script>
<style>
#hashrate_table .value {
  text-align: right;
}
</style>
