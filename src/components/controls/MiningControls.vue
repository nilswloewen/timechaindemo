<template>
<ToolCard :id="`${type}_mining_controls`"
          :collapse="collapse" :encoding="localEncoding" :encoding-btn="encodingBtn"
          :title="`Mining Block #${block.height}`" class="mining_controls"
          v-on:rotate-encoding="$emit('rotate-encoding')">
  <template v-slot:tour>
    <slot name="tour"/>
  </template>

  <b-collapse :id="collapse" visible>
    <!-- Max -->
    <div class="list label"> Max</div>
    <div class="list value">
      {{ hashMax[localEncoding] }}
    </div>

    <!-- Target -->
    <div class="list label" style="color: #f79413;">Target</div>
    <div class="list value" style="color: #f79413;">
      {{ target[localEncoding] }}
    </div>

    <!-- Hash -->
    <div class="list label"> Hash</div>
    <div class="list value">{{ block.hash[localEncoding] }}</div>

    <!--Nonce-->
    <div class="list label">Nonce</div>
    <div class="list value">
      <template v-if="interactiveNonce">
        <b-input-group class="float-right" size="sm">
          <b-form-input :disabled="block.isHashValid"
                        :max="4294967295" :min="0"
                        :state="block.isHashValid" :value="block.header.nonce" size="sm" type="number"
                        @change="onNonceChange"/>
          <b-button :disabled="block.isHashValid" class="inc_nonce_btn" size="sm"
                    style="border-top-left-radius: 0; border-bottom-left-radius: 0;"
                    @click="onIncrementNonce">
            +1
          </b-button>
        </b-input-group>
      </template>

      <template v-else>
        {{ block.header.nonce.toLocaleString() }}
      </template>
    </div>

    <div v-if="showGoBrrr" class="list value text-left">
      <template v-if="!block.isHashValid">
        <div class="list label">Controls</div>
        <div class="list value">
          <b-button size="sm" variant="primary" @click="toggleMining">
            <template v-if="!isMining">Go Brrr (Automate)</template>
            <template v-else>Stop Mining</template>
          </b-button>

          <b-button v-if="showSolutionBtn" :disabled="block.isHashValid" class="float-right"
                    size="sm" style="background-color: transparent; border-color: #f79413;"
                    @click="$emit('show-solution')">Show Solution
          </b-button>
        </div>
      </template>

      <div class="list label">Guesses</div>
      <div class="list value">{{ block.tries.toLocaleString() }}</div>

      <div class="list label">Time Elapsed</div>
      <div class="list value">{{ block.timeToMine.toFixed(2) }} Seconds</div>

      <div class="list label">Hashrate</div>
      <div class="list value">{{ getHps }}<sub>H/s</sub></div>

    </div>
  </b-collapse>
</ToolCard>
</template>

<script>
import ToolCard from '@/components/cards/ToolCard';
import Block from '@/services/block/Block';
import Num from '@/services/Num';

export default {
  components: { ToolCard },
  props: {
    block: Block,
    collapse: String,
    encodingBtn: Boolean,
    hashMax: Num,
    index: Number,
    interactiveNonce: Boolean,
    isMining: Boolean,
    localEncoding: String,
    showGoBrrr: Boolean,
    showSolutionBtn: Boolean,
    target: Num,
    type: String,
  },

  computed: {
    getHps() {
      if (this.block.timeToMine > 0) {
        return (this.block.tries / this.block.timeToMine).toFixed(2);
      }
      return 0;
    },
  },
  methods: {
    toggleMining() {
      if (this.isMining) {
        this.$emit('stop-mining', this.index);
        return;
      }
      this.isMining = !this.isMining;
      this.$emit('start-mining', this.index);
    },
    onNonceChange(newNonce) {
      this.$emit('update-nonce', Number(newNonce), this.index);
    },
    onIncrementNonce() {
      this.$emit('update-nonce', this.block.header.nonce + 1, this.index);
    },
  },
};
</script>

<style>
.mining_controls {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
