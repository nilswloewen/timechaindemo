<template>
<b-card class="info_card" no-body>
  <b-card-header>
    <b-container>
      <b-row class="row_1">
        <b-col>&nbsp;</b-col>
        <b-col class="text-center title"> {{ title }}</b-col>
        <b-col class="text-right">
          <EncodingBtn v-if="encodingBtn" :encoding="encoding"
                       v-on:rotate-encoding="$emit('rotate-encoding')"/>
        </b-col>
      </b-row>
    </b-container>
  </b-card-header>

  <slot/>

</b-card>
</template>

<script>
import EncodingBtn from '@/components/controls/EncodingBtn.vue';

export default {
  components: {
    EncodingBtn,
  },
  props: {
    encoding: String,
    encodingBtn: Boolean,
    title: String,
  },
};
</script>

<style>
.row_1 {
  line-height: 2.6em;
}

.title {
  overflow: visible;
  white-space: nowrap;
}

.card.info_card {
  box-shadow: -1px 2px 4px 2px #17a2b8;
  border-color: #17a2b8;
}
</style>
