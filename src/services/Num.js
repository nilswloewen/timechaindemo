class Num {
  // hexDigits is needed to format leading zeros.
  constructor(bigInt = BigInt(0), hexDigits = 2) {

    this.bigInt = bigInt;
    this.num = Number(bigInt);
    const binLength = hexDigits * 4;
    this.binary = bigInt.toString(2).padStart(binLength, '0');
    this.exponential = Number(bigInt).toExponential();
    this.hexadecimal = bigInt.toString(16).padStart(hexDigits, '0');
    this.yRatio = 0;

    // @TODO: Should decimal have leading zeros?
    // I don't really like doing this here but it works.
    // const hex = '0x'.padEnd(hexDigits + 2, 'f');
    // const hashMax = BigInt(hex);
    // const hashMaxDec = hashMax.toLocaleString('en-US');
    // this.decimal = bigInt.toLocaleString('en-US').padStart(hashMaxDec.length, '000,');
    this.decimal = bigInt.toLocaleString('en-US');
  }
}

export default Num;
