<template>
<b-card class="tool_card" no-body>
  <b-card-header>
    <b-container>
      <b-row class="row_1">

        <b-col class="text-left">
          <!-- Wrench icon: Made this a button just to center it -->
          <b-button class="wrench_btn" disabled size="sm">
            <b-icon-wrench/>
          </b-button>

          <!-- Collapse Btn -->
          <b-button v-if="collapse" v-b-toggle="collapse" class="collapse_mining_controls" size="sm">
            <span class="when-open"><b-icon-arrow-up/></span>
            <span class="when-closed"><b-icon-arrow-down/></span>
          </b-button>
        </b-col>

        <b-col class="text-center title">{{ title }}</b-col>

        <b-col class="text-right">
          <slot name="tour"/>
          <EncodingBtn v-if="encodingBtn" :encoding="encoding" v-on:rotate-encoding="$emit('rotate-encoding')"/>
        </b-col>
      </b-row>
      <b-row v-if="headerAddon" class="row_2">
        <b-col class="text-center">
          {{ headerAddon }}
        </b-col>
      </b-row>
    </b-container>
  </b-card-header>

  <slot/>

</b-card>
</template>

<script>
import EncodingBtn from '@/components/controls/EncodingBtn';

export default {
  components: { EncodingBtn },
  props: {
    collapse: String,
    encoding: { type: String, required: false },
    encodingBtn: Boolean,
    headerAddon: String,
    title: String,
  },
};
</script>

<style>
.title {
  overflow: visible;
  white-space: nowrap;
}

.row_1 {
  line-height: 2.6em;
}

.row_2 {
  font-size: 0.875rem;
}

.row_2 .col {
  padding: 0 5px;
  overflow: auto;
  white-space: nowrap;
}

.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}

.btn-secondary.wrench_btn.disabled {
  background-color: transparent;
  border: none;
}

.card.tool_card {
  box-shadow: -1px 2px 4px 2px rgba(255, 255, 255, 0.4);
  border-color: rgba(255, 255, 255, 0.4);
}

.collapse_mining_controls {
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: -2px 3px 10px 2px rgba(255, 255, 255, 0.1);
}
</style>
