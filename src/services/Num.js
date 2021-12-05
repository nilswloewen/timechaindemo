class Num {
  // hexDigits is needed to format leading zeros.
  constructor(bigInt = BigInt(0), hexDigits = 2) {
    this.yRatio = 0.0;

    this.bigInt = bigInt;
    this.num = Number(bigInt);

    this.exponential = this.num.toExponential();
    this.hexadecimal = bigInt.toString(16).padStart(hexDigits, '0');
    this.binary = bigInt.toString(2).padStart(hexDigits * 4, '0');

    // Calc length of hashMax to find out how many zeros to padStart.
    const hashMax = BigInt('0x'.padEnd(hexDigits + 2, 'f'));
    const hashMaxDecimalDigits = hashMax.toString().length;

    // Add commas to decimal string.
    const decimal = this.bigInt.toString();
    const padDecimal = decimal.padStart(hashMaxDecimalDigits, '0');
    const triplets = padDecimal.match(/\d{1,3}(?=(\d{3})*$)/g);
    this.decimal = triplets.join(',');
  }
}

export default Num;
