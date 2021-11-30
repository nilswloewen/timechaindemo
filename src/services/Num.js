class Num {
  // hexDigits is needed to format leading zeros.
  constructor(bigInt = BigInt(0), hexDigits = 2) {
    this.bigInt = bigInt;
    this.num = Number(bigInt);
    this.exponential = Number(bigInt).toExponential();
    this.hexadecimal = bigInt.toString(16).padStart(hexDigits, '0');
    this.yRatio = 0;

    // Add leading zeros.
    const hashMax = BigInt('0x'.padEnd(hexDigits + 2, 'f'));
    const hashMaxBin = hashMax.toString(2);
    this.binary = bigInt.toString(2).padStart(hashMaxBin.length, '0');

    const hashMaxDec = hashMax.toLocaleString('en-US');
    const dec = bigInt.toLocaleString('en-US');

    // this.decimal = dec.padStart(hashMaxDec.length, '000,');
    this.decimal = dec;
  }
}

export default Num;
