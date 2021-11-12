<template>
  <Page slide data-anchor="hexadecimal_notation">
    <h1>Hex Notation</h1>

    <b-card class="mb-4">
      <h4 class="text-left"><a href="https://www.etymonline.com/word/hexadecimal">hexadecimal (adj.)</a></h4>
      <hr>
      1952, in reference to a numeral system based on 16, not 10; from hexa- + decimal.
      From 1970 as a noun. Greek hexa-, combining form of hex "six".
    </b-card>

    <p>
      The hash function about to be discussed uses hexadecimal notation (hex) as a compact and human
      readable way to represent the binary hash output.
    </p>

    <p>
      As you can see in the following table these values are equivalent yet notated differently.
      To distinguish which notation system is being used numbers will be presented in base format:
      Value <sub>(base)</sub>.
    </p>

    <b-card id="hex_table" no-body class="mt-4">
      <b-table-simple outlined striped hover class="border-1" small>
        <b-thead head-variant="dark">
          <b-tr>
            <b-th class="text-right">Decimal</b-th>
            <b-th class="text-center">Binary</b-th>
            <b-th>Hexadecimal</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(row, index) in rows" :key="index">
            <b-td class="text-right"> {{row['d']}}<sub>10</sub></b-td>
            <b-td class="text-center">{{row['b']}}<sub>2</sub></b-td>
            <b-td><b>{{row['h']}}</b><sub>16</sub></b-td>
          </b-tr>
        </b-tbody>
        <caption>

          * A-F can be upper or lowercase
        </caption>
      </b-table-simple>
    </b-card>


  </Page>
</template>

<script>
import Page from '@/components/pages/Page.vue';

export default {
  components: {
    Page,
  },
  data() {
    return {
      columns: ['Decimal', 'Binary', 'Hexadecimal'],
      rows: [
        { d: 0, b: '0000', h: '0' },
        { d: 1, b: '0001', h: '1' },
        { d: 2, b: '0010', h: '2' },
        { d: 3, b: '0011', h: '3' },
        { d: 4, b: '0100', h: '4' },
        { d: 5, b: '0101', h: '5' },
        { d: 6, b: '0110', h: '6' },
        { d: 7, b: '0111', h: '7' },
        { d: 8, b: '1000', h: '8' },
        { d: 9, b: '1001', h: '9' },
        { d: 10, b: '1010', h: 'A' },
        { d: 11, b: '1011', h: 'B' },
        { d: 12, b: '1100', h: 'C' },
        { d: 13, b: '1101', h: 'D' },
        { d: 14, b: '1110', h: 'E' },
        { d: 15, b: '1111', h: 'F' },
      ],
    };
  },
};
</script>

<style>
  #hex_table {
    margin-left: auto;
    margin-right: auto;
    max-width: 315px;
  }
</style>
