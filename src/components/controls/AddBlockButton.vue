<template>
<div class="add_block_wrapper">
  <ToolCard title="Add Block" :encoding-btn="enableChangeEncoding"
            :encoding="encoding" v-on:rotate-encoding="$emit('rotate-encoding')">
    <b-card-body>
      <div v-if="disableAddBlockBtn">
        All blocks must be valid before adding new blocks.
      </div>

      <b-input-group v-else prepend="Data" size="sm">
        <b-form-input v-model="newBlockData" placeholder="Try adding a block..." size="sm"/>

        <b-button @click="addBlock" variant="primary" size="sm"
                  style="border-top-left-radius: 0; border-bottom-left-radius: 0;">
          Add
        </b-button>

        <b-button title="Reset" @click="$emit('reset-blocks')" size="sm" class="ml-2" >
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
    enableChangeEncoding: Boolean,
    encoding: String,
    disableAddBlockBtn: Boolean,
  },
  data() {
    return {
      newBlockData: '',
      now: new Date().toUTCString()
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
    }
  }
};
</script>
