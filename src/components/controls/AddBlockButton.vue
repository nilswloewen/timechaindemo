<template>
<div class="add_block_wrapper">
  <ToolCard :encoding="encoding" :encoding-btn="enableChangeEncoding"
            title="Add Block" v-on:rotate-encoding="$emit('rotate-encoding')">
    <b-card-body>
      <div v-if="disableAddBlockBtn">
        All blocks must be valid before adding new ones.
      </div>

      <b-input-group v-else prepend="Data" size="sm">
        <b-form-input v-model="newBlockData" placeholder="Try adding a block..." size="sm"/>

        <b-button
          class="add_block_btn" size="sm"
          style="border-top-left-radius: 0; border-bottom-left-radius: 0;"
          variant="primary"
          @click="addBlock">
          Add
        </b-button>

        <b-button class="ml-2" size="sm" title="Reset" @click="$emit('reset-blocks')">
          <b-icon-trash/>
        </b-button>
      </b-input-group>
    </b-card-body>
  </ToolCard>
</div>
</template>

<script>
import ToolCard from '@/components/cards/ToolCard';

export default {
  components: { ToolCard },
  props: {
    disableAddBlockBtn: Boolean,
    enableChangeEncoding: Boolean,
    encoding: String,
  },
  data() {
    return {
      newBlockData: '',
      now: new Date().toUTCString(),
    };
  },
  mounted() {
    this.getTime();
  },
  methods: {
    addBlock() {
      this.$emit('add-block', this.newBlockData);
    },
    getTime() {
      this.now = new Date().toUTCString();
      setTimeout(this.getTime, 1000);
    },
  },
};
</script>
