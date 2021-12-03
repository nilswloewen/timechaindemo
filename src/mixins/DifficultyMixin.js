import BlockchainApi from '@/services/BlockchainApi';

export default {
  data() {
    return {
      hashrate: 42,
      hashrateUnit: 'base',
      blocktime: 15,
      blocktimeUnit: 'Seconds',
      blocktimeUnits: ['Seconds', 'Minutes', 'Hours', 'Days', 'Weeks', 'Months', 'Years'],
      hashrateUnits: [
        '',
        'Kilo',
        'Mega',
        'Giga',
        'Tera',
        'Peta',
        'Exa',
        'Zeta',
        'Yotta'
      ],
      hashrateConversion: {
        base: { value: 1 },
        Kilo: { value: 1_000 },
        Mega: { value: 1_000_000 },
        Giga: { value: 1_000_000_000 },
        Tera: { value: 1_000_000_000_000 },
        Peta: { value: 1_000_000_000_000_000 },
        Exa: { value: 1_000_000_000_000_000_000 },
        Zeta: { value: 1_000_000_000_000_000_000_000 },
        Yotta: { value: 1_000_000_000_000_000_000_000_000 }
      },

    };
  },
  methods: {
    onAntminer() {
      this.hashrate = 13;
      this.hashrateUnit = 'Tera';
      this.calcTarget();
    },
    async onGlobal() {
      const gigaHashrate = await BlockchainApi.getHashRate();
      this.setHashrate(gigaHashrate * this.hashrateConversion.Giga.value);
      this.calcTarget();
    },
    setHashrate(hashrate) {
      for (const unit of ['Yotta', 'Zeta', 'Exa', 'Peta', 'Tera', 'Giga', 'Mega', 'Kilo', 'base']) {
        if (hashrate > this.hashrateConversion[unit].value) {
          this.hashrate = hashrate / this.hashrateConversion[unit].value;
          this.hashrateUnit = unit;
          return;
        }
      }
    },

    updateHashrate(newHashrate) {
      this.hashrate = Number(newHashrate || 1);
      this.calcTarget();
    },
    updateHashrateUnit(newHashrateUnit) {
      this.hashrateUnit = newHashrateUnit || 'base';
      this.calcTarget();
    },
    updateBlocktime(newTime) {
      this.blockTime = Number(newTime);
      this.calcTarget();
    },
    updateBlocktimeUnit(newTimeUnit) {
      this.blockTimeUnit = newTimeUnit;
      this.calcTarget();
    },

    findTargetAndMax(desiredAvgHashes) {
      let hexDigits = 1;

      // Increase complexity by increasing maximum.
      while (hexDigits <= 64) {
        hexDigits += 1;
        let max = (16 ** hexDigits) - 1;
        let target = max;
        let avgHashes = 1 / (target / max);

        // Binary search down for closest match.
        while (target > 1) {
          target = Math.floor(target / 2);
          avgHashes = 1 / (target / max);

          if (desiredAvgHashes < avgHashes) {
            // Increment up to the closest match.
            while (target < max) {
              target += 1;
              avgHashes = 1 / (target / max);

              if (avgHashes < desiredAvgHashes) {
                return { hexDigits, target: Math.floor(target) };
              }
            }
          }
        }
      }
      // @TODO: This should never happen!
      return { hexDigits: 1, target: 1 };
    },

    timeToSeconds(time, unit) {
      switch (unit) {
        case 'Seconds':
          return time;
        case 'Minutes':
          return time * 60;
        case 'Hours':
          return time * 60 * 60;
        case 'Days':
          return time * 60 * 60 * 24;
        case 'Weeks':
          return time * 60 * 60 * 24 * 7;
        case 'Months':
          return time * 60 * 60 * 24 * 30;
        case 'Years':
          return time * 60 * 60 * 24 * 365;
      }
    },
    secondsToTime(seconds) {
      const minute = 60;
      if (seconds < minute) {
        return { val: seconds, unit: 'Seconds' };
      }

      const hour = minute * 60;
      if (seconds < hour) {
        return { val: Math.floor(seconds / minute), unit: 'Minutes' };
      }

      const day = hour * 24;
      if (seconds < day) {
        return { val: Math.floor(seconds / hour), unit: 'Hours' };
      }

      const week = day * 7;
      if (seconds < week) {
        return { val: Math.floor(seconds / day), unit: 'Days' };
      }

      const month = day * 30;
      if (seconds < month) {
        return { val: Math.floor(seconds / week), unit: 'Weeks' };
      }

      const year = day * 365;
      if (seconds < year) {
        return { val: Math.floor(seconds / month), unit: 'Months' };
      }

      const years = Math.floor(seconds / year);
      if (years < 1_000_000_000) {
        return { val: years.toLocaleString('en-US'), unit: 'Years' };
      }
      return { val: years.toExponential(2), unit: 'Years' };
    },

    async calibrateHps() {
      const start = new Date().getTime();
      let elapsed = 0;

      while (elapsed < 1000) {
        this.blocks[0].header.nonce += 1;
        await this.finalizeBlock(0);
        elapsed = new Date().getTime() - start;
      }

      const hashes = this.blocks[0].header.nonce / (elapsed / 1000);
      this.setHashrate(hashes.toFixed(0));

      // Reset block.
      this.blocks[0].header.nonce = 0;
      await this.finalizeBlock(0);
      this.guesses = [];
    },

    getHashrateLong() {
      const hashrate = this.hashrate * this.hashrateConversion[this.hashrateUnit].value;
      return hashrate.toLocaleString();
    },

    async updateTargetAndBlocktime(newTarget) {
      await this.updateTarget(newTarget);

      const hashrate = this.hashrate * this.hashrateConversion[this.hashrateUnit].value;
      const seconds = Math.ceil((1 / hashrate) * this.avgHashes);
      const { val, unit } = this.secondsToTime(seconds);

      this.blockTime = val;
      this.blockTimeUnit = unit;
    },
  }

}
