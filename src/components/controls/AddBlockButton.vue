<template>
<div class="add_block_wrapper">
  <ToolCard title="Add Block" encoding-btn v-on:rotate-encoding="$emit('rotate-encoding')">
    <b-card-body>
      <b-input-group prepend="Data" size="sm">
        <b-form-input v-model="newBlockData" :disabled="disableAddBlockBtn"
                      placeholder="Try adding a block..." size="sm"/>

        <b-button @click="addBlock" variant="primary" size="sm"
                  :disabled="disableAddBlockBtn" style="border-top-left-radius: 0; border-bottom-left-radius: 0;">
          Add
        </b-button>

        <b-button title="Reset" @click="$emit('reset-blocks')" size="sm" class="ml-2"
                  variant="warning">
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
    disableAddBlockBtn: Boolean
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
