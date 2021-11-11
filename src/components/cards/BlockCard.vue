<template>
  <div>
    <!-- Chain-link icon -->
    <b-iconstack font-scale="3" v-if="index > 0" class="m-2">
      <b-icon-link stacked rotate="90" :style="getLinkColor" />
      <b-icon stacked icon="slash" variant="danger" v-if="!block.isHashValid"></b-icon>
    </b-iconstack>

    <b-card no-body>
      <b-table-simple class="block" small>
        <b-thead head-variant="dark">
          <b-tr>
            <b-th>
              Block #{{ this.block.height }}
            </b-th>
            <b-th>
              <b-form-input title="Hash" size="sm" :style="getColor"
                            :value="getHash" :disabled="true" :state="block.isHashValid"/>
            </b-th>
          </b-tr>
        </b-thead>

        <b-tbody>
          <b-tr>
            <b-td>Data</b-td>
            <b-td>
              <b-form-input @change="onDataChange" :value="block.header.data" size="sm"/>
            </b-td>
          </b-tr>
          <b-tr>
            <b-td>Nonce</b-td>
            <b-td>
              <b-input-group>
                <b-form-input class="nonce_input" @change="onNonceChange"
                              :value="block.header.nonce" :state="block.isHashValid"
                              type="number" size="sm"/>
                <b-button-group>
                  <b-button size="sm" @click="incrementNonce" :disabled="block.isHashValid">
                    + 1
                  </b-button>
                  <b-button size="sm" @click="solveNonce" variant="warning">Solve</b-button>
                </b-button-group>
              </b-input-group>
            </b-td>
          </b-tr>
          <b-tr>
            <b-td>Previous Hash</b-td>
            <b-td>
              <b-form-input title="Hash" :style="getPrevColor" size="sm" :disabled="true"
                            :value="getPrevHash" :state="block.isHashValid"/>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-card>
  </div>
</template>

<script>
import Block from '@/services/block/DemoBlock';

export default {
  props: {
    block: Block,
    index: Number,
  },

  computed: {
    getColor() {
      return `background-color: ${this.block.color};`;
    },
    getPrevColor() {
      return `background-color: ${this.block.prevColor};`;
    },
    getLinkColor() {
      return `color: ${this.block.color};`;
    },
    getHash() {
      const hex = this.block.hash.substr(0, 2);
      const decimal = parseInt(hex, 16);
      return `Hex: ${hex} | Decimal: ${decimal}`;
    },
    getPrevHash() {
      return this.block.header.prevHash.substr(0, 2);
    },
  },

  methods: {
    solveNonce() {
      this.$emit('solveNonce', this.index);
    },
    incrementNonce() {
      this.$emit('updateNonce', this.block.header.nonce + 1, this.index);
    },
    onDataChange(newData) {
      this.$emit('updateData', newData, this.index);
    },
    onNonceChange(nonce) {
      this.$emit('updateNonce', Number(nonce), this.index);
    },
    async finalizeBlock() {
      this.$emit('finalizeBlock', this.index);
    },
  },
};
</script>

<style>
  .table.block tr {
    line-height: 31px;
  }
  .table.block td {
    text-align: left;
  }
</style>
