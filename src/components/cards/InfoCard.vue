<template>
<b-card no-body class="info_card">
  <b-card-header>
    <b-container>
      <b-row class="row_1">
        <b-col>&nbsp;</b-col>
        <b-col class="text-center title"> {{ title }}</b-col>
        <b-col class="text-right">
          <b-button v-if="encodingBtn" class="rotate_encoding_btn" @click="$emit('rotate-encoding')" size="sm">
            <b-icon-vector-pen/>
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-card-header>

  <slot/>

</b-card>
</template>

<script>
export default {
  props: {
    title: String,
    encodingBtn: Boolean
  }
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
</style>
