<template>
<b-card no-body class="tool_card">
  <b-card-header>
    <b-container>
      <b-row class="row_1">
        <b-col class="text-left">
          <b-icon-wrench/>
        </b-col>
        <b-col class="text-center title"> {{ title }}</b-col>
        <b-col class="text-right">
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
    title: String,
    headerAddon: String,
    encodingBtn: Boolean,
    encoding: {type: String, required: false},
  }
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
</style>
