import BlockHeader from '@/services/block/DemoBlockHeader';
import Block from '@/services/block/DemoBlock';
import Num from '@/services/Num';

export default {
  data() {
    return {
      colors: [
        '#B983FF',
        '#94DAFF',
        '#94B3FD',
        '#99FEFF',
        '#14E3FD',
        '#3CAFAA',
        '#6471F7',
        '#7855F5',
        '#99FEFF',
        '#A01CF2'
      ],
      blocks: [new Block('', BlockHeader.genesis, 0, '#61e294', 'inherit')],
      disableAddBlockBtn: true,
      hexDigits: 2,
      newBlockData: '',
      guesses: []
    };
  },
  async mounted() {
    await this.resetBlocks();
  },
  methods: {
    async addBlock(newData) {
      let data = newData === 'Try adding a block...'
        ? 'Try changing this data...'
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
      await block.calcHash(this.hexDigits);
      this.blocks = [block];

      // Rebuild fullpage so scrolling works.
      window.fullpage_api.reBuild();
    },

    async finalizeBlock(index) {
      const block = this.blocks[index];
      block.header.timestamp = new Date().getTime() / 1000;
      await block.calcHash(this.hexDigits);
      block.isHashValid = block.hash.bigInt < this.target.bigInt;

      if (block.isHashValid) {
        this.$root.$emit('bv::toggle::collapse', 'collapse_success_msg');
      }

      this.guesses.push({
        xRatio: 0,
        yRatio: block.hash.num / this.hashMax.num,
        hash: block.hash,
        isHashValid: block.isHashValid
      });

      // Performance governor.
      if (this.guesses.length > 100) {
        this.guesses.shift();
      }
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

      while (!block.isHashValid) {
        block.header.nonce += 1;
        await this.finalizeBlock(index);
      }

      this.isMining = false;
    },
    async updateNonce(nonce, index) {
      this.blocks[index].header.nonce = nonce;
      await this.instantUpdate(index);
    },
    async updateData(event, index) {
      this.blocks[index].header.data = event.target.value;
      await this.delayedUpdate(index);
    },

  }
};
