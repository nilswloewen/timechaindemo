<template>
  <b-collapse id="collapse_block_chain_overview" visible>
    <b-card no-body>
      <b-card-header v-b-toggle.collapse_block_chain_overview>
        <b-icon-chevron-compact-up /> Blockchain
      </b-card-header>

      <b-card-body>
        <b-collapse id="collapse_satoshi_quote" >
          <b-card>
            <q>
              We propose a solution to the double-spending problem using a peer-to-peer network. The network timestamps transactions by hashing them into an ongoing chain of hash-based proof-of-work, forming a record that cannot be changed without redoing
              the proof-of-work.
            </q> - <a href="https://bitcoin.org/bitcoin.pdf">Bitcoin Whitepaper</a>
          </b-card>
          <br/>
        </b-collapse>

        <BlockChain/>
        <BlockChainPow/>

      </b-card-body>
    </b-card>

  </b-collapse>
</template>

<script>
  import BlockChain from "@/components/cards/BlockChain";
  import BlockChainPow from "@/components/cards/BlockChainPow";

  export default {
    components: {
      BlockChain,
      BlockChainPow
    }
  }
</script>