export default {
  methods: {
    async updateData(event, index) {
      this.blocks[index].header.data = event.target.value;
      await this.delayedUpdate(index);
    },
  },
};
