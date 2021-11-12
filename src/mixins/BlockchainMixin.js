import BlockHeader from '@/services/block/DemoBlockHeader';
import Block from '@/services/block/DemoBlock';

export default {
  data() {
    return {
      colors: [
        '#61e294',
        '#7bcdba',
        '#9799ca',
        '#b47aea',
        '#bd93d8',
      ],
      blocks: [],
      disableAddBlockBtn: true,
      hexDigits: 2,
      newBlockData: '',
    };
  },
  async mounted() {
    await this.resetBlocks();
  },
  watch: {
    hexDigits() {
      this.targetMax = 2 ** (this.hexDigits * 4);
    },
  },
  methods: {
    async addBlock() {
      const header = new BlockHeader(this.newBlockData, 0, this.blocks[0].hash);
      const height = this.blocks.length;
      const color = this.colors[this.blocks.length % this.colors.length];
      const prevColor = this.colors[(this.blocks.length - 1) % this.colors.length];

      const block = new Block('', header, height, color, prevColor);
      await block.calcHash();

      this.blocks.unshift(block);

      // Reset 'Add Block' input.
      this.disableAddBlockBtn = true;
      this.newBlockData = '';
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
      await block.calcHash();
      this.blocks = [block];
    },

    async finalizeBlock(index) {
      const block = this.blocks[index];
      await block.calcHash();

      const hash = parseInt(block.hash.substr(0, this.hexDigits), 16);
      block.isHashValid = hash < this.target;

      if (index > 0) {
        this.blocks[index - 1].header.prevHash = block.hash;
      }
      this.resetAddBlockBtn();
    },
    async delayedUpdate(index) {
      await this.finalizeBlock(index);
      if (index === 0) {
        return;
      }
      setTimeout(async () => {
        await this.delayedUpdate(index - 1);
      }, 500);
    },

    getColor() {
      const i = this.index % this.colors.length;
      return this.colors[i];
    },
  },
};
