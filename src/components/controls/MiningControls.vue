<template>
<ToolCard class="mining_controls" :title="`Mining Block #${block.height}`"
          encoding-btn :encoding="localEncoding" v-on:rotate-encoding="$emit('rotate-encoding')">

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
    <b-form-checkbox class="float-left ml-2" style="padding-top: 1px;"
                     @change="toggleMining" switch :checked="isMining"/>
    <b-button @click="toggleMining">
      <template v-if="!isMining">
        Start
      </template>
      <template v-else>
        Stop
      </template>
    </b-button>
    <span class="float-left" style="padding-top: 3px;">
      Go Brrr (Automate)
      <br> {{ block.tries.toLocaleString() }} guesses
      <br> {{ block.timeToMine }} Seconds Elapsed
      <br> {{ getHps }}<sub>H/s</sub>
    </span>

    <b-button v-if="showSolutionBtn" @click="$emit('show-solution')" size="sm"
              :disabled="block.isHashValid" class="float-right">Show Solution
    </b-button>
  </div>
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
    target: Num
  },

  computed: {
    getHps() {
      if (this.block.timeToMine > 0) {
        return (this.block.tries / this.block.timeToMine).toFixed(2);
      }
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
