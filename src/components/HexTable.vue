<template>
  <b-table-simple outlined striped hover id="hex_table" class="border-1" small>
    <b-thead head-variant="dark">
      <b-tr>
        <b-th class="text-right">Decimal</b-th>
        <b-th class="text-center">Binary</b-th>
        <b-th>Hexadecimal</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr v-for="(row, index) in rows" :key="index">
        <b-td class="text-right"> {{row['d']}}</b-td>
        <b-td class="text-center">{{row['b']}}</b-td>
        <b-td class="hex">        {{row['h']}}</b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script>
export default {
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
        { d: 10, b: '1010', h: 'A | a' },
        { d: 11, b: '1011', h: 'B | b' },
        { d: 12, b: '1100', h: 'C | c' },
        { d: 13, b: '1101', h: 'D | d' },
        { d: 14, b: '1110', h: 'E | e' },
        { d: 15, b: '1111', h: 'F | f' },
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
  .hex {
    font-weight: bold;
  }
</style>
