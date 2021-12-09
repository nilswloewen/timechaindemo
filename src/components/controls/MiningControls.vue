<template>
<ToolCard class="mining_controls" :title="`Mining Block #${block.height}`" :collapse="collapse"
          encoding-btn :encoding="localEncoding" v-on:rotate-encoding="$emit('rotate-encoding')">

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
        <b-input-group size="sm" class="float-right">
          <b-form-input @change="onNonceChange"
                        :value="block.header.nonce" :state="block.isHashValid"
                        type="number" :min="0" :max="4294967295" size="sm" :disabled="block.isHashValid"/>
          <b-button size="sm" @click="onIncrementNonce" :disabled="block.isHashValid"
                    style="border-top-left-radius: 0; border-bottom-left-radius: 0;">
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
          <b-button @click="toggleMining" size="sm">
            <template v-if="!isMining">Go Brrr (Automate)</template>
            <template v-else>Stop Mining</template>
          </b-button>

          <b-button v-if="showSolutionBtn" @click="$emit('show-solution')" size="sm"
                    :disabled="block.isHashValid" class="float-right">Show Solution
          </b-button>
        </div>
      </template>

      <div class="list label">Guesses</div>
      <div class="list value">{{ block.tries.toLocaleString() }} </div>

      <div class="list label">Time Elapsed</div>
      <div class="list value">{{ block.timeToMine }} Seconds</div>

      <div class="list label">Hashrate</div>
      <div class="list value">{{ getHps }}<sub>H/s</sub></div>

    </div>
  </b-collapse>
</ToolCard>
</template>

<script>
import Block from '@/services/block/Block';
import Num from '@/services/Num';
import ToolCard from '@/components/cards/ToolCard';

export default {
  components: { ToolCard },
  props: {
    block: Block,
    hashMax: Num,
    index: Number,
    interactiveNonce: Boolean,
    isMining: Boolean,
    localEncoding: String,
    showGoBrrr: Boolean,
    showSolutionBtn: Boolean,
    collapse: String,
    target: Num,
  },

  computed: {
    getHps() {
      if (this.block.timeToMine > 0) {
        return (this.block.tries / this.block.timeToMine).toFixed(2);
      }
      return 0;
    }
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
    }
  }
};
</script>

<style>
.mining_controls {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
