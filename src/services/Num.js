class Num {
  constructor(bigInt = BigInt(0)) {
    this.bigInt = bigInt;
    this.num = Number(bigInt);
    this.binary = bigInt.toString(2);
    this.decimal = bigInt.toLocaleString('en-US');
    this.exponential = Number(bigInt).toExponential();
    this.hexadecimal = bigInt.toString(16);
    this.yRatio = 0;
  }
}

export default Num;
