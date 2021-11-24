import BlockHeader from '@/services/block/DemoBlockHeader';
import Block from '@/services/block/DemoBlock';

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
        '#A01CF2',
      ],
      blocks: [new Block('', BlockHeader.genesis, 0, '#61e294', 'inherit')],
      disableAddBlockBtn: true,
      hexDigits: 2,
      newBlockData: '',
      guesses: [],
    };
  },
  async mounted() {
    await this.resetBlocks();
  },
  methods: {
    async addBlock(newData) {
      let data = newData === 'Try adding a block...'
        ? 'Try changing this data...'
        : newData ;

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

      this.guesses.push({
        xRatio: 0,
        yRatio: block.hash.num / this.hashMax.num,
        hash: block.hash,
        isHashValid: block.isHashValid,
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
    async delayedUpdate(index) {
      // const wrapper = document.getElementsByClassName('blockchain_wrapper')[0];
      // const element = document.getElementById(`card_${this.blocks[index].height}`);
      // this.scrollToElm(wrapper, element, 2);

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
    mineThisBlock(index) {
      this.blockToMine = index;
      fullpage_api.moveSlideRight();
    },
  },
};
