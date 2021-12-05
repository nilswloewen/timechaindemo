<template>
<Page slide data-anchor="notation">
  <h1>Notation</h1>

  <p>
    <b>Numbers can be written with different notation styles for different use cases.</b>
    While computers think in 1's and 0's,
    binary notation is not easy for humans to read. Decimal notation is easy to read, but
    it might not be the most compact way to store values.
  </p>

  <p>
    You will see this notation button later in this demo:
  </p>
  <p class="text-center">
    <b-icon-vector-pen role="button" class="rotate_encoding_btn" @click="rotateEncoding"/>
  </p>
  <p>
    Try clicking it to see different ways numbers are represented.
  </p>

  <b-card no-body class="info_card">
    <b-card-header>
      Bitcoin's maximum supply
      <b-icon-vector-pen role="button" class="rotate_encoding_btn float-right" @click="rotateEncoding"/>
    </b-card-header>
    <b-card-body>
      <b>{{ num[encoding[activeEncoding]] }}</b>
      <br>
      {{ encoding[activeEncoding] }} notation
    </b-card-body>
  </b-card>

  <hr>

  <b-card no-body class="tldr_card" header="tl;dr (Too Long; Didn't Read)">
    <b-card-body>
      Numbers can be written in different ways, but they are still just numbers.
    </b-card-body>
  </b-card>

  <hr>

  <b-card class="definition_card">
    <h4 class="text-left"><a href="https://www.etymonline.com/word/hexadecimal">hexadecimal (adj.)</a></h4>
    <hr>
    1952, in reference to a numeral system based on 16, not 10; from hexa- + decimal.
    From 1970 as a noun. Greek hexa-, combining form of hex "six".
  </b-card>

  <p>
    As you can see in the following table these values are equivalent yet notated differently.
    Hexadecimal notation uses letters a-f for values 10-15.
  </p>

  <b-card id="hex_table" no-body header="Ways to write 0-15" class="info_table">
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
          <b-td>{{ row.hexadecimal }}</b-td>
          <b-td>{{ row.binary }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </b-card>

  <hr>

  <p>
    Very large numbers can be written in a shorthand form called <b>Exponential Notation</b>.
    You can basically ignore everything but the last number and think <q>I don't know what this
    number is but it's like this many digits long!</q>
  </p>

  <b-card id="exponential_table" no-body header="Exponential Notation" class="info_table">
    <b-table-simple class="text-center" small>
      <b-tbody>
        <b-tr v-for="(row, index) in expRows" :key="index">
          <b-td>{{ row.name }}</b-td>
          <b-td>{{ row.val.toLocaleString() }}</b-td>
          <b-td><b>{{ row.val.toExponential() }}</b></b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </b-card>

  <hr>

  <p>
    Try changing the values in the notation converter and try to predict how the other notations will change...
  </p>

  <b-card no-body id="hex_converter" class="tool_card">
    <b-card-header>
      <b-icon-wrench/> Notation <b-icon-arrow-left-right/> Converter
    </b-card-header>

    <div class="list label">Hexadecimal (base 16)</div>
    <div class="list value">
      <b-form-input @keyup="onHex" :value="Number(val).toString(16)"/>
    </div>

    <div class="list label">Decimal (base 10)</div>
    <div class="list value">
      <b-form-input v-model="val" type="number"/>
    </div>

    <div class="list label">Exponential</div>
    <div class="list value">{{ Number(val).toExponential() }}</div>

    <div class="list label">Binary (base 2)</div>
    <div class="list value">
      <b-form-input :value="Number(val).toString(2)" @keyup="onBin"/>
    </div>
  </b-card>

</Page>
</template>

<script>
import Page from '@/components/Page.vue';
import Num from '@/services/Num';
import EncodingMixin from '@/mixins/EncodingMixin';

export default {
  mixins: [
    EncodingMixin
  ],
  components: {
    Page
  },
  data() {
    return {
      val: 48879,
      num: new Num(21_000_000n, 7),
      rows: [
        { decimal: 15, binary: '1111', hexadecimal: 'f' },
        { decimal: 14, binary: '1110', hexadecimal: 'e' },
        { decimal: 13, binary: '1101', hexadecimal: 'd' },
        { decimal: 12, binary: '1100', hexadecimal: 'c' },
        { decimal: 11, binary: '1011', hexadecimal: 'b' },
        { decimal: 10, binary: '1010', hexadecimal: 'a' },
        { decimal: 9, binary: '1001', hexadecimal: '9' },
        { decimal: 8, binary: '1000', hexadecimal: '8' },
        { decimal: 7, binary: '0111', hexadecimal: '7' },
        { decimal: 6, binary: '0110', hexadecimal: '6' },
        { decimal: 5, binary: '0101', hexadecimal: '5' },
        { decimal: 4, binary: '0100', hexadecimal: '4' },
        { decimal: 3, binary: '0011', hexadecimal: '3' },
        { decimal: 2, binary: '0010', hexadecimal: '2' },
        { decimal: 1, binary: '0001', hexadecimal: '1' },
        { decimal: 0, binary: '0000', hexadecimal: '0' }
      ],
      expRows: [
        { val: 21_000_000, name: 'Twenty-one million' },
        { val: 100_000_000_000_000, name: 'One-hundred Trillion' },
        { val: Number('1e+100'), name: 'A googol' },
      ]
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
    }
  }
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
  max-width: 100px;
  overflow-x: auto;
  overflow-wrap: normal;
}

</style>
