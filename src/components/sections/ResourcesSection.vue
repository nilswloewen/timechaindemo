<template>
  <Page data-anchor="resources" first last>
    <h1>Resources</h1>

    <p>
      This tool was made possible by the inspiration and insight of the following resources:
    </p>

    <div>
      <b>For technical understanding:</b>
      <ul>
        <li>
          <Link href="https://bitcoin.org/bitcoin.pdf">Bitcoin Whitepaper</Link>
          <div class="pl-4">by Satoshi Nakamoto </div>
        </li>
        <li>
          <Link href="https://LearnMeABitcoin.com">LearnMeABitcoin.com</Link>
          <div class="pl-4">
            by Greg Walker <Link href="https://twitter.com/in3rsha"><b-icon-twitter/></Link>
          </div>
        </li>
        <li>
          <Link href="https://aantonop.com/books/">Mastering Bitcoin</Link>
          <div class="pl-4">
            by Andreas Antonopoulos <Link href="https://twitter.com/aantonop"><b-icon-twitter/></Link>
          </div>
        </li>
      </ul>
    </div>

    <div>
      <b>For UX inspiration:</b>
      <ul>
        <li>
          <Link href="https://BlockchainDemo.io">BlockchainDemo.io</Link>
          <div class="pl-4">
            - Also has a great demo of Bitcoin's P2P Network
          </div>
        </li>
      </ul>
    </div>

    <div>
      <b>For philosophical insight:</b>
      <ul>
        <li>
          <Link href="https://dergigi.com/2021/01/14/bitcoin-is-time">Bitcoin is Time</Link>
          <div class="pl-4">
            by Gigi <Link href="https://twitter.com/dergigi"><b-icon-twitter/></Link>
          </div>
        </li>
        <li>
          <Link href="https://www.amazon.com/dp/1090109911">Bitcoin: Sovereignty through Mathematics</Link>
          <div class="pl-4">
            by Knut Svanholm <Link href="https://twitter.com/knutsvanholm"><b-icon-twitter/></Link>
          </div>
        </li>
        <li>
          <Link
            href="https://bitcoinmagazine.com/culture/decoding-the-bitcoin-full-node-sculpture-a-cypherpunk-chronometer">
            Bitcoin Full Node Sculpture
          </Link>
          <div class="pl-4">
            by FractalEncrypt <Link href="https://twitter.com/FractalEncrypt"><b-icon-twitter/></Link>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <b>To jump further down the rabbit hole:</b>
      <ul>
        <li>
          <Link href="https://bitcoin-resources.com/">Bitcoin Resources</Link>
          <div class="pl-4">
            by Gigi <Link href="https://twitter.com/dergigi"><b-icon-twitter/></Link>
          </div>
        </li>
      </ul>
    </div>


    <hr style="margin: 4em 0;">

    <p class="text-center">
      Site by Nils Loewen <Link href="https://twitter.com/nilswloewen"><b-icon-twitter/></Link>,
      built with <Link href="https://vuejs.org/">Vue.js</Link>.
      <Link href="https://github.com/nilswloewen/timechaindemo">
        <img src="/assets/GitHub-Mark-Light-32px.png" alt="GitHub Logo" height="18px" style="padding-bottom: 2px;"/>
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
#resources_section li {
  margin-top: 4px;
}
</style>
