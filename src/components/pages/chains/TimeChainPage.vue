<template>
  <div class="section">
    <Page data-anchor="timechain" slide>
      <h1>Timechain</h1>
      <Complexity :initial-hex-digits="2" v-on:update-hex-digits="updateHexDigits"/>

      <Target :initial-target="initialTarget" :max="this.targetMax"
              v-on:updateTarget="updateTarget"/>
      <Difficulty :hps-of-this-device="hpsOfThisDevice" :avg-hashes="avgHashes()"
                  v-on:calibrate-hps="calibrateHps"/>
      <AddBlockButton :disable-add-block-btn="disableAddBlockBtn"
                      v-on:add-block="addBlock"
                      v-on:reset-blocks="resetBlocks"/>
      <BlockCard v-for="(block, index) in this.blocks" :key="index"
                 :block="block"
                 :hex-digits="hexDigits"
                 :index="index"
                 showData
                 showNonce
                 v-on:finalize-block="finalizeBlock"
                 v-on:solve-nonce="solveNonce"
                 v-on:update-data="updateData"
                 v-on:update-nonce="updateNonce" />
    </Page>
    <Page data-anchor="complexity" slide>
      <h1>Complexity</h1>
      <p>
        So far the demo has only shown the first two digits of the hash. Change
        the slider to see more digits of the hash and see how the difficulty grows...
      </p>
      <Complexity :initial-hex-digits="2" v-on:update-hex-digits="updateHexDigits"/>
    </Page>
  </div>
</template>

<script>
import AddBlockButton from '@/components/controls/AddBlockButton.vue';
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import Complexity from '@/components/controls/Complexity.vue';
import Difficulty from '@/components/controls/Difficulty.vue';
import HashesPerSecondMixin from '@/mixins/HashesPerSecondMixin';
import Page from '@/components/pages/Page.vue';
import NonceMixin from '@/mixins/NonceMixin';
import Target from '@/components/controls/Target.vue';
import UpdateDataMixin from '@/mixins/UpdateDataMixin';
import UpdateHexDigitsMixin from '@/mixins/UpdateHexDigitsMixin';
import TargetMixin from '@/mixins/TargetMixin';

export default {
  mixins: [
    BlockchainMixin,
    HashesPerSecondMixin,
    NonceMixin,
    UpdateDataMixin,
    UpdateHexDigitsMixin,
    TargetMixin,
  ],
  components: {
    AddBlockButton,
    BlockCard,
    Complexity,
    Difficulty,
    Page,
    Target,
  },
};
</script>
