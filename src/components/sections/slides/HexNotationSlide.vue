<template>
<Page slide data-anchor="hexadecimal_notation"
      encoding-btn
      :active-encoding="activeEncoding"
      :encoding="encoding"
      v-on:rotate-encoding="rotateEncoding"
      v-on:update-active-encoding="updateActiveEncoding">

  <h1>Numerical Notation</h1>
  <p>
    In the top right corner there is a button to change the notation of some numbers in this demo.
  </p>

  <b-card class="text-center">
    Bitcoin's maximum supply:
    <hr>
      <b>{{ num[encoding[activeEncoding]] }}</b>
  </b-card>

  <p>
    Notation styles are chosen for different use cases. While computers think in 1's and 0's,
    binary notation is not easy for humans to read. While decimal notation is easy to read,
    it is not the most compact way to store values.
  </p>

  <p>
    The hash function about to be discussed uses hexadecimal notation as a compact and (more)
    human readable way to represent the binary hash output.
  </p>

  <b-card>
    <h4 class="text-left"><a href="https://www.etymonline.com/word/hexadecimal">hexadecimal (adj.)</a></h4>
    <hr>
    1952, in reference to a numeral system based on 16, not 10; from hexa- + decimal.
    From 1970 as a noun. Greek hexa-, combining form of hex "six".
  </b-card>

  <p>
    As you can see in the following table these values are equivalent yet notated differently.
  </p>

  <b-card id="hex_table" no-body>
    <b-table-simple class="border-1" small>
      <b-thead>
        <tr>
          <th colspan="3" class="text-center">Ways to notate 0-15</th>
        </tr>
      </b-thead>
      <b-thead head-variant="dark">
        <b-tr>
          <b-th>Decimal</b-th>
          <b-th>Hexadecimal</b-th>
          <b-th>Binary</b-th>
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

  <b-card no-body id="hex_converter">
    <b-card-header header-bg-variant="info">
      <b-icon-wrench/>
      Notation
      <b-icon-arrow-left-right/>
      Converter
    </b-card-header>

    <b-list-group-item class="list-field">Hexadecimal (base 16)</b-list-group-item>
    <b-list-group-item class="list-value">
      <b-form-input @keyup="onHex" :value="Number(val).toString(16)"/>
    </b-list-group-item>

    <b-list-group-item class="list-field">Decimal (base 10)</b-list-group-item>
    <b-list-group-item class="list-value">
      <b-form-input v-model="val" type="number"/>
    </b-list-group-item>

    <b-list-group-item class="list-field">Exponential</b-list-group-item>
    <b-list-group-item class="list-value">{{ Number(val).toExponential() }}</b-list-group-item>

    <b-list-group-item class="list-field">Binary (base 2)</b-list-group-item>
    <b-list-group-item class="list-value">
      <b-form-input :value="Number(val).toString(2)" @keyup="onBin"/>
    </b-list-group-item>

  </b-card>

</Page>
</template>

<script>
import Page from '@/components/Page.vue';
import Num from '@/services/Num';
import EncodingMixin from '@/mixins/EncodingMixin';
import EncodingButton from '@/components/controls/EncodingButton';

export default {
  mixins: [
    EncodingMixin
  ],
  components: {
    EncodingButton,
    Page
  },
  data() {
    return {
      val: 48879,
      num: new Num(21_000_000n, 7),
      columns: ['Decimal', 'Binary', 'Hexadecimal'],
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
      ]
    };
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

#hex_table table {
  color: white;
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

</style>
