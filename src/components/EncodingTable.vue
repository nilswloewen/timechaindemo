<template>
  <b-card id="encoding_table_wrapper">
    <b-table id="encoding" :items="encodings"/>
  </b-card>
</template>

<script>
  export default {
    props: {
      hash: {
        type: String,
        required: true
      }
    },

    watch: {
      hash() {
        // eslint-disable-next-line no-undef
        const bigInt = BigInt(`0x${this.hash}`);
        this.encodings = [
          {Encoding: "Hexadecimal", base: 16, value: this.hash},
          {Encoding: "Binary", base: 2, value: bigInt.toString(2).padStart(256, '0')},
          {Encoding: "Decimal", base: 10, value: bigInt.toLocaleString('en-US')},
          {Encoding: "Exponential", base: 10, value: Number(`0x${this.hash}`).toExponential()}
        ];
      }
    },

    data() {
      return {
        encodings: [
          {Encoding: "Hexadecimal", base: 16, value: '?'},
          {Encoding: "Binary", base: 2, value:  '?'.padStart(256, '?')},
          {Encoding: "Decimal", base: 10, value: '?'},
          {Encoding: "Exponential", base: 10, value: '?'},
        ]
      };
    },
  };
</script>

<style>
  #encoding_table_wrapper {
    overflow-x: scroll;
  }
</style>
