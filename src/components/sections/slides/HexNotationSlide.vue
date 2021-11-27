<template>
<Page slide data-anchor="hexadecimal_notation">
  <h1>Numerical Notation</h1>

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

  <b-row>
    <b-col class="hex_col">
      <b-card id="hex_table" no-body>
        <b-table-simple class="border-1" small>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>Decimal</b-th>
              <b-th>Binary</b-th>
              <b-th>Hexadecimal</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(row, index) in rows" :key="index">
              <b-td>{{ row['d'] }}</b-td>
              <b-td>{{ row['b'] }}</b-td>
              <b-td>
                <template v-if="parseInt(row['h'], 16) > 9">
                  <b>{{ row['h'] }}</b>
                </template>
                <template v-else>
                  {{ row['h'] }}
                </template>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-card>
    </b-col>

    <b-col class="hex_col">
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

        <b-list-group-item class="list-field">Binary (base 2)</b-list-group-item>
        <b-list-group-item class="list-value">
          <b-form-input :value="Number(val).toString(2)" @keyup="onBin"/>
        </b-list-group-item>
      </b-card>

    </b-col>
  </b-row>

</Page>
</template>

<script>
import Page from '@/components/Page.vue';

export default {
  components: {
    Page
  },
  data() {
    return {
      val: 48879,
      columns: ['Decimal', 'Binary', 'Hexadecimal'],
      rows: [
        {d: 15, b: '1111', h: 'f'},
        {d: 14, b: '1110', h: 'e'},
        {d: 13, b: '1101', h: 'd'},
        {d: 12, b: '1100', h: 'c'},
        {d: 11, b: '1011', h: 'b'},
        {d: 10, b: '1010', h: 'a'},
        {d: 9, b: '1001', h: '9'},
        {d: 8, b: '1000', h: '8'},
        {d: 7, b: '0111', h: '7'},
        {d: 6, b: '0110', h: '6'},
        {d: 5, b: '0101', h: '5'},
        {d: 4, b: '0100', h: '4'},
        {d: 3, b: '0011', h: '3'},
        {d: 2, b: '0010', h: '2'},
        {d: 1, b: '0001', h: '1'},
        {d: 0, b: '0000', h: '0'}
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
}

#hex_table table {
  color: white;
}

#hex_table th:nth-child(1),
#hex_table td:nth-child(1) {
  text-align: right;
}

#hex_table th:nth-child(2),
#hex_table td:nth-child(2) {
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

</style>
