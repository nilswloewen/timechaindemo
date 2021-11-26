class BlockchainApi {
  static async getHashRate() {
    const response = await fetch('https://blockchain.info/q/hashrate');
    const gigaHashRate = await response.text();
    return Number(gigaHashRate);
  }
}

export default BlockchainApi;
