<template>
<Page data-anchor="notation" slide>
  <h1>Notation</h1>

  <TldrCard title="tl;dr (Too Long; Didn't Read)">
    Numbers can be written in different ways, but they are still just numbers.
  </TldrCard>

  <p>
    Numbers are written with different notation styles for different use cases.
    While computers think in 1's and 0's, binary notation is not easy for humans
    to read. Decimal notation is easy to read, but it might not be the most compact
    way to store values.
  </p>

  <p>
    You will see this notation button throughout this demo:
  </p>

  <p class="text-center">
    <EncodingBtn :encoding="encoding[activeEncoding]" size="lg" v-on:rotate-encoding="rotateEncoding"/>
  </p>

  <p>
    Try clicking it to see different ways the number 21 million can be represented.
  </p>

  <InfoCard :encoding="encoding[activeEncoding]" encoding-btn
            title="Bitcoin's Maximum Supply" v-on:rotate-encoding="rotateEncoding">
    <b-card-body>
      <b>{{ num[encoding[activeEncoding]] }}</b>
      <br>
      {{ encoding[activeEncoding].charAt(0).toUpperCase() + encoding[activeEncoding].slice(1) }} Notation
    </b-card-body>
  </InfoCard>

  <hr>

  <b-card class="definition_card">
    <h4 class="text-left">
      <Link href="https://www.etymonline.com/word/hexadecimal">hexadecimal (adj.)</Link>
    </h4>
    <hr>
    1952, in reference to a numeral system based on 16, not 10; from hexa- + decimal.
    From 1970 as a noun. Greek hexa-, combining form of hex "six".
  </b-card>

  <p>
    As you can see in the following table these values are equivalent yet notated differently.
    <b>Hexadecimal notation uses letters a-f for values 10-15.</b>
  </p>

  <InfoCard id="hex_table" title="Ways to write 0-15">
    <b-table-simple small>
      <b-thead>
        <b-tr>
          <b-td>Decimal</b-td>
          <b-td>Hexadecimal</b-td>
          <b-td>Binary</b-td>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(row, index) in rows" :key="index">
          <b-td>{{ row.decimal }}</b-td>
          <b-td>
            <b v-if="index > 9">{{ row.hexadecimal }}</b>
            <template v-else>{{ row.hexadecimal }}</template>
          </b-td>
          <b-td>{{ row.binary }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </InfoCard>
  <hr>

  <h4>Exponential Notation</h4>
  <p>
    Very large numbers can be written in a shorthand form called exponential notation.
    You can basically ignore everything but the last number and think <q>I don't know what this
    number is but it's like this many digits long!</q>
  </p>

  <InfoCard id="exponential_table" title="Exponential Notation">
    <b-table-simple small>
      <b-tbody>
        <b-tr v-for="(row, index) in expRows" :key="index">
          <b-td>{{ row.name }}</b-td>
          <b-td style="overflow: auto; max-width: 100px;">{{ row.val.toLocaleString() }}</b-td>
          <b-td><b>{{ row.val.toExponential() }}</b></b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </InfoCard>

  <hr>

  <p>
    Try changing the values in the notation converter and try to predict how the other notations will change...
  </p>

  <ToolCard title="Notation Converter">
    <div class="list label">Decimal (base 10)</div>
    <div class="list value">
      <b-input-group>
        <b-form-input v-model="val" type="number"/>
        <b-button-group size="sm">
          <b-button size="sm" style="border-bottom-left-radius: 0; border-top-left-radius: 0;"
                    variant="primary" @click="val = Number(val) + 1">
            <b-icon-plus/>
          </b-button>
          <b-button size="sm" @click="val = Number(val) - 1">
            <b-icon-dash/>
          </b-button>
        </b-button-group>
      </b-input-group>
    </div>

    <div class="list label">Hexadecimal (base 16)</div>
    <div class="list value">
      <b-form-input :value="Number(val).toString(16)" @keyup="onHex"/>
    </div>

    <div class="list label">Exponential</div>
    <div class="list value">{{ Number(val).toExponential() }}</div>

    <div class="list label">Binary (base 2)</div>
    <div class="list value">
      <b-form-input :value="Number(val).toString(2)" @keyup="onBin"/>
    </div>
  </ToolCard>

</Page>
</template>

<script>
import InfoCard from '@/components/cards/InfoCard';
import TldrCard from '@/components/cards/TldrCard';
import ToolCard from '@/components/cards/ToolCard';
import EncodingBtn from '@/components/controls/EncodingBtn';
import Link from '@/components/Link';
import Page from '@/components/Page.vue';
import EncodingMixin from '@/mixins/EncodingMixin';
import Num from '@/services/Num';

export default {
  mixins: [
    EncodingMixin,
  ],
  components: {
    Link,
    EncodingBtn,
    ToolCard,
    InfoCard,
    Page,
    TldrCard,
  },
  data() {
    return {
      expRows: [
        { val: 21_000_000, name: 'Twenty-one million' },
        { val: 100_000_000_000_000, name: 'One-hundred Trillion' },
      ],
      num: new Num(21_000_000n, 7),
      rows: [
        { decimal: 0, binary: '0000', hexadecimal: '0' },
        { decimal: 1, binary: '0001', hexadecimal: '1' },
        { decimal: 2, binary: '0010', hexadecimal: '2' },
        { decimal: 3, binary: '0011', hexadecimal: '3' },
        { decimal: 4, binary: '0100', hexadecimal: '4' },
        { decimal: 5, binary: '0101', hexadecimal: '5' },
        { decimal: 6, binary: '0110', hexadecimal: '6' },
        { decimal: 7, binary: '0111', hexadecimal: '7' },
        { decimal: 8, binary: '1000', hexadecimal: '8' },
        { decimal: 9, binary: '1001', hexadecimal: '9' },
        { decimal: 10, binary: '1010', hexadecimal: 'a' },
        { decimal: 11, binary: '1011', hexadecimal: 'b' },
        { decimal: 12, binary: '1100', hexadecimal: 'c' },
        { decimal: 13, binary: '1101', hexadecimal: 'd' },
        { decimal: 14, binary: '1110', hexadecimal: 'e' },
        { decimal: 15, binary: '1111', hexadecimal: 'f' },
      ],
      val: 10,
    };
  },
  mounted() {
    this.num.decimal = '21,000,000';
  },
  methods: {
    onHex(e) {
      let hexVal = e.target.value;
      hexVal = hexVal.replace(/[^a-fA-F0-9]/g, '');
      if (hexVal.length === 0) {
        hexVal = 0;
      }
      this.val = parseInt(hexVal, 16);
    },
    onBin(e) {
      let binVal = e.target.value;
      binVal = binVal.replace(/[^01]/g, '');
      if (binVal.length === 0) {
        binVal = 0;
      }
      this.val = parseInt(binVal, 2);
    },
  },
};
</script>

<style>
#hex_table {
  margin-left: auto;
  margin-right: auto;
  max-width: 315px;
  text-align: center;
}

#hex_converter {
  margin-left: auto;
  margin-right: auto;
  max-width: 315px;
}

.col.hex_col {
  max-width: 100%;
  min-width: 264px;
  padding-top: 0;
  padding-bottom: 0;
}

#exponential_table td {
  overflow-x: auto;
  overflow-wrap: normal;
}

#exponential_table td:nth-child(1) {
  padding-left: 1.25rem;
}

#exponential_table td:nth-child(2) {
  text-align: right;
  max-width: 212px;
}

#exponential_table td:nth-child(3) {
  text-align: right;
  padding-right: 1.25rem;
}

</style>
