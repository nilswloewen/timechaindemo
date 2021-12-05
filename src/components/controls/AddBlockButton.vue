<template>
<div class="add_block_card">
  <b-card no-body>
    <b-card-header header-bg-variant="info">
      <b-icon-wrench/> Add block
      <b-icon-vector-pen class="rotate_encoding_btn float-right" @click="$emit('rotate-encoding')"/>
    </b-card-header>

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
  </b-card>
</div>
</template>

<script>
export default {
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
