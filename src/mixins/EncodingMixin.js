export default {
  data() {
    return {
      activeEncoding: 2,
      encoding: ['binary', 'decimal', 'hexadecimal', 'exponential'],
      // encoding: ['decimal', 'hexadecimal'],
    };
  },
  methods: {
    rotateEncoding() {
      this.activeEncoding += 1;
      this.activeEncoding %= this.encoding.length;
    },
  }
};
