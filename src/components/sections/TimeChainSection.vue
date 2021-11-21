<template>
  <div id="timechain_section" class="section">

<!--    <Page data-anchor="timechain" slide fp_bg>-->
<!--      <h1>Timechain</h1>-->
<!--      <p>-->
<!--        Mining is the process of adding recent transactions to the blockchain.-->
<!--      </p>-->

<!--      <Complexity :initial-hex-digits="2" v-on:update-hex-digits="updateHexDigits"/>-->

<!--      <Target v-on:updateTarget="updateTarget" full-->
<!--              :targetMax="targetMax"-->
<!--              :target="target"-->
<!--              :avgHashes="avgHashes"-->
<!--              :probability="probability"-->
<!--              :denominator="denominator"-->
<!--              :numerator="numerator"-->
<!--              :localEncoding="encoding[0]"/>-->
<!--      <Difficulty :hps-of-this-device="hpsOfThisDevice" :avg-hashes="calcAvgHashes()"-->
<!--                  v-on:calibrate-hps="calibrateHps"/>-->
<!--    </Page>-->

<!--    <Page data-anchor="timechain_blocks" slide fp_bg>-->
<!--      <AddBlockButton :disable-add-block-btn="disableAddBlockBtn"-->
<!--                      v-on:add-block="addBlock"-->
<!--                      v-on:reset-blocks="resetBlocks"/>-->
<!--      <div class="blockchain_wrapper">-->
<!--        <BlockCard v-for="(block, index) in this.blocks" :key="index"-->
<!--                   :block="block"-->
<!--                   :hex-digits="hexDigits"-->
<!--                   :index="index"-->
<!--                   :local-encoding="encoding[0]"-->
<!--                   showData-->
<!--                   showNonce-->
<!--                   v-on:finalize-block="finalizeBlock"-->
<!--                   v-on:solve-nonce="solveNonce"-->
<!--                   v-on:update-data="updateData"-->
<!--                   v-on:update-nonce="updateNonce" />-->
<!--      </div>-->
<!--    </Page>-->

    <div class="slide" data-anchor="pow_graph" id="pow_graph_slide">
      <div class="fp-bg"/>
      <Graph :guesses="this.guesses" :target="this.target" :local-encoding="encoding[0]"/>
      <b-card class="overlay" no-body>
        <b-card-header>
          Mining for Block #{{ blocks[blockToMine].height }}
          <b-button @click="rotateEncoding" size="sm">
            {{ this.encoding[0].replace(/^\w/, c => c.toUpperCase()) }}
          </b-button>
        </b-card-header>

        <!--  Max -->
        <b-list-group-item class="list-field"> Max </b-list-group-item>
        <b-list-group-item class="list-value">
          {{ hashMax[encoding[0]] }}
        </b-list-group-item>

        <!-- Target -->
        <b-list-group-item class="list-field" style="color: #f79413;"> Target </b-list-group-item>
        <b-list-group-item class="list-value" style="color: #f79413;">
          {{ target[encoding[0]] }}
        </b-list-group-item>

        <!-- Hash -->
        <b-list-group-item class="list-field"> Hash </b-list-group-item>
        <b-list-group-item class="list-value">{{ blocks[blockToMine].hash[encoding[0]] }} </b-list-group-item>

        <!--Nonce-->
        <b-list-group-item class="list-field">Nonce</b-list-group-item>
        <b-list-group-item class="list-value">
          <b-input-group size="sm">
            <b-form-input class="nonce_input" @change="onNonceChange"
                          :value="blocks[blockToMine].header.nonce" :state="blocks[blockToMine].isHashValid"
                          type="number" :min="0" :max="4294967295" size="sm"/>
            <b-button-group>
              <b-button size="sm" @click="minerIncNonce" :disabled="blocks[blockToMine].isHashValid">
                +1
              </b-button>
            </b-button-group>
          </b-input-group>
          <b-form-checkbox v-model="isMining" switch size="lg"> Go Brrr</b-form-checkbox>
        </b-list-group-item>
      </b-card>
    </div>

  </div>
</template>

<script>
import AddBlockButton from '@/components/controls/AddBlockButton.vue';
import BlockCard from '@/components/cards/BlockCard.vue';
import BlockchainMixin from '@/mixins/BlockchainMixin';
import Complexity from '@/components/controls/Complexity.vue';
import Difficulty from '@/components/controls/Difficulty.vue';
import HashesPerSecondMixin from '@/mixins/HashesPerSecondMixin';
import Graph from '@/components/Graph.vue';
import Page from '@/components/Page.vue';
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
    Graph,
    Page,
    Target,
  },
  data() {
    return {
      blockToMine: 0,
      isMining: false,
    };
  },
  watch: {
    isMining(state) {
      if (state) {
        this.solveNonce(this.blockToMine)
      }
    }
  },
  methods: {
    onNonceChange(nonce) {
      this.blocks[this.blockToMine].header.nonce = Number(nonce);
      this.finalizeBlock(this.blockToMine)
    },
    minerIncNonce() {
      this.blocks[this.blockToMine].header.nonce += 1;
      this.finalizeBlock(this.blockToMine)
    },
  }
};
</script>

<style>
  .overlay {
    position: fixed;
    top: 40px;
    left: 40px;
  }
</style>
