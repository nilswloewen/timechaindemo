import Block from '@/services/block/DemoBlock';
import BlockHeader from '@/services/block/DemoBlockHeader';
import Num from '@/services/Num';

export default {
  data() {
    return {
      blocks: [new Block('', BlockHeader.genesis, 0, '#61e294', 'inherit')],
      colors: [
        'rgba(20, 227, 253, 1)',
        '#B983FF',
        '#6471F7',
        '#A01CF2'
      ],
      disableAddBlockBtn: true,
      guesses: [],
      newBlockData: ''
    };
  },
  async mounted() {
    await this.resetBlocks();
  },
  methods: {
    async addBlock(newData) {
      let data = newData === ''
        ? BlockHeader.getRandomData()
        : newData;

      const header = new BlockHeader(data, 0, this.blocks[0].hash);
      const height = this.blocks.length;
      const color = this.colors[this.blocks.length % this.colors.length];
      const prevColor = this.colors[(this.blocks.length - 1) % this.colors.length];

      const block = new Block('', header, height, color, prevColor);
      await block.calcHash(this.hexDigits);

      this.blocks.unshift(block);

      // Reset 'Add Block' input.
      this.disableAddBlockBtn = true;
      this.newBlockData = '';

      // Rebuild fullpage so scrolling works.
      window.fullpage_api.reBuild();
    },
    resetAddBlockBtn() {
      this.disableAddBlockBtn = false;
      this.blocks.forEach((block) => {
        if (!block.isHashValid) {
          this.disableAddBlockBtn = true;
        }
      });
    },
    async resetBlocks() {
      const block = new Block('', BlockHeader.genesis, 0, this.colors[0], 'inherit');
      block.prevHash = new Num(0n, this.hexDigits);
      await block.calcHash(this.hexDigits);
      this.blocks = [block];

      // Rebuild fullpage so scrolling works.
      window.fullpage_api.reBuild();
    },

    async finalizeBlock(index) {
      const block = this.blocks[index];
      block.header.timestamp = performance.now() / 1000;
      await block.calcHash(this.hexDigits);
      block.isHashValid = block.hash.bigInt < this.target.bigInt;

      this.guesses.push({
        xRatio: 0,
        yRatio: block.hash.num / this.hashMax.num,
        hash: block.hash,
        isHashValid: block.isHashValid
      });

      // Performance governor.
      // if (this.guesses.length > 100) {
      //   this.guesses.shift();
      // }

      if (index > 0) {
        this.blocks[index - 1].header.prevHash = block.hash;
      }

      this.resetAddBlockBtn();
    },

    async instantUpdate(index) {
      await this.finalizeBlock(index);
      if (index === 0) {
        return;
      }

      await this.instantUpdate(index - 1);
    },
    async delayedUpdate(index) {
      await this.finalizeBlock(index);
      if (index === 0) {
        return;
      }

      setTimeout(async () => {
        await this.delayedUpdate(index - 1);
      }, 1000);
    },

    mineThisBlock(index) {
      this.blockToMine = index;
      this.guesses = [];
      fullpage_api.moveSlideRight();
    },

    async startMining(index) {
      this.isMining = true;
      const block = this.blocks[index];
      block.startTime = performance.now();
      block.tries = 0;

      await this.mine(block, index);
      this.isMining = false;
    },

    async mine(block, index) {
      block.tries += 1;
      block.header.nonce += 1;
      await this.finalizeBlock(index);

      const elapsed = performance.now() - block.startTime;
      block.timeToMine = (elapsed / 1000).toFixed(2);

      if (!block.isHashValid && this.isMining) {
        await this.mine(block,index);
      }
    },

    stopMining() {
      this.isMining = false;
    },

    async updateNonce(nonce, index) {
      this.blocks[index].header.nonce = nonce;
      await this.instantUpdate(index);
    },
    async updateData(event, index) {
      this.blocks[index].header.data = event.target.value;
      await this.delayedUpdate(index);
    }

  }
};
