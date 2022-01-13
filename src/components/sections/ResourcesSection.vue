<template>
<Page data-anchor="resources" first last>
  <h1>Resources</h1>

  <p>
    This tool was made possible by the inspiration and insight of the following resources:
  </p>

  <div>
    For technical understanding:
    <ul>
      <li>
        <Link href="https://LearnMeABitcoin.com">LearnMeABitcoin.com</Link>
      </li>
      <li>
        <Link href="https://aantonop.com/books/">Mastering Bitcoin</Link>
      </li>
      <li>
        <Link href="https://bitcoin.org/bitcoin.pdf">Bitcoin Whitepaper</Link>
      </li>
    </ul>
  </div>

  <div>
    For UX inspiration:
    <ul>
      <li>
        <Link href="https://BlockchainDemo.io">BlockchainDemo.io</Link>
        - Also has a great demo of Bitcoin's
        Peer-to-Peer (P2P) Network
      </li>
    </ul>
  </div>

  <div>
    For philosophical insight:
    <ul>
      <li>
        <Link href="https://dergigi.com/2021/01/14/bitcoin-is-time">Bitcoin is Time</Link>
      </li>
      <li>
        <Link href="https://www.amazon.com/dp/1090109911">Bitcoin: Sovereignty through Mathematics</Link>
      </li>
      <li>
        <Link
          href="https://bitcoinmagazine.com/culture/decoding-the-bitcoin-full-node-sculpture-a-cypherpunk-chronometer">
          Bitcoin Full Node Sculpture by FractalEncrypt
        </Link>
      </li>
    </ul>
  </div>

  <hr style="margin: 4em 0;">

  <p class="text-center">
    Site by <Link href="https://nilsloewen.com">Nils Loewen</Link>,
    built with <Link href="https://vuejs.org/">Vue.js</Link>.
    <Link href="https://github.com/nilswloewen/timechaindemo">
      <img src="/assets/GitHub-Mark-Light-32px.png" alt="GitHub Logo" height="20px"/>
    </Link>
  </p>

  <p>
    If you found this demo to be valuable, please
    <Link href="https://tippin.me/@nilswloewen">send me some sats!</Link>

    Till then, Tick Tock, next block.
  </p>

  <hr style="margin: 4em 0;">

  <b-card no-body>
    <img alt="Bitcoin is magic internet money" class="card-img" height="775"
         src="/assets/opening_meme.webp" width="556"/>
  </b-card>
</Page>
</template>

<script>
import Link from '@/components/Link';
import Page from '@/components/Page.vue';

export default {
  components: {
    Link,
    Page,
  },
};
</script>

<style>
#resources_section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  url('/assets/backgrounds/ultimate.webp');
}
</style>
