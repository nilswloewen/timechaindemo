<template>
  <div id="timechain_section" class="section">
    <EncodingButton :active-encoding="activeEncoding" :encoding="encoding"
                    v-on:update-active-encoding="updateActiveEncoding"
                    v-on:rotate-encoding="rotateEncoding" />

    <Page data-anchor="timechain" slide fp_bg>
      <h1>Timechain</h1>
      <p>
        Mining is the process of adding recent transactions to the blockchain.
      </p>

      <p>
        <q>In other words, the difficulty-adjustment is about keeping a constant
          time, not a constant level of security, difficulty, or energy expenditure.</q>
        - DerGigi
      </p>

      <Difficulty :hps-of-this-device="hpsOfThisDevice" :avg-hashes="calcAvgHashes()"
                  :difficulty="difficulty"
                  :hash-max="hashMax"
                  :local-encoding="encoding[activeEncoding]"
                  v-on:calibrate-hps="calibrateHps"
                  v-on:update-hex-digits="updateHexDigits"/>

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

    <Page data-anchor="timechain_blocks" slide fp_bg>
      <AddBlockButton :disable-add-block-btn="disableAddBlockBtn"
                      v-on:add-block="addBlock"
                      v-on:reset-blocks="resetBlocks"/>
      <div class="blockchain_wrapper">
        <BlockCard v-for="(block, index) in this.blocks" :key="index"
                   :block="block"
                   :hex-digits="hexDigits"
                   :index="index"
                   :local-encoding="encoding[activeEncoding]"
                   showData
                   showNonce
                   v-on:finalize-block="finalizeBlock"
                   v-on:mine-this-block="mineThisBlock"
                   v-on:update-data="updateData"
                   v-on:update-nonce="updateNonce" />
      </div>
    </Page>

    <div class="slide" data-anchor="pow_graph" id="pow_graph_slide">
      <div class="fp-bg"/>
      <Graph :guesses="this.guesses" :target="this.target" :local-encoding="encoding[activeEncoding]"/>
      <b-card class="overlay" no-body>
        <b-card-header>
          Mining for Block #{{ blocks[blockToMine].height }}
        </b-card-header>

        <!--  Max -->
        <b-list-group-item class="list-field"> Max </b-list-group-item>
        <b-list-group-item class="list-value">
          {{ hashMax[encoding[activeEncoding]] }}
        </b-list-group-item>

        <!-- Target -->
        <b-list-group-item class="list-field" style="color: #f79413;"> Target </b-list-group-item>
        <b-list-group-item class="list-value" style="color: #f79413;">
          {{ target[encoding[activeEncoding]] }}

          <Target v-on:updateTarget="updateTarget" range
                  :targetMax="targetMax"
                  :target="target"
                  :avgHashes="avgHashes"
                  :probability="probability"
                  :denominator="denominator"
                  :numerator="numerator"
                  :localEncoding="encoding[activeEncoding]"/>
        </b-list-group-item>

        <!-- Hash -->
        <b-list-group-item class="list-field"> Hash </b-list-group-item>
        <b-list-group-item class="list-value">{{ blocks[blockToMine].hash[encoding[activeEncoding]] }} </b-list-group-item>

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
import Difficulty from '@/components/controls/Difficulty.vue';
import EncodingButton from '@/components/controls/EncodingButton.vue';
import EncodingMixin from '@/mixins/EncodingMixin';
import Graph from '@/components/Graph.vue';
import HashesPerSecondMixin from '@/mixins/HashesPerSecondMixin';
import NonceMixin from '@/mixins/NonceMixin';
import Page from '@/components/Page.vue';
import Target from '@/components/controls/Target.vue';
import TargetMixin from '@/mixins/TargetMixin';
import UpdateDataMixin from '@/mixins/UpdateDataMixin';
import UpdateHexDigitsMixin from '@/mixins/UpdateHexDigitsMixin';

export default {
  mixins: [
    BlockchainMixin,
    EncodingMixin,
    HashesPerSecondMixin,
    NonceMixin,
    TargetMixin,
    UpdateDataMixin,
    UpdateHexDigitsMixin,
  ],
  components: {
    AddBlockButton,
    BlockCard,
    Difficulty,
    EncodingButton,
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
    mineThisBlock(index) {
      this.blockToMine = index;
      fullpage_api.moveSlideRight();
    },

  },
};
</script>

<style>
  .overlay {
    position: fixed;
    top: 40px;
    left: 40px;
  }
</style>
