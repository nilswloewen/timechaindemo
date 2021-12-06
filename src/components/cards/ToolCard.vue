<template>
  <b-card no-body :id="`${label.toLowerCase()}_tool_card`" class="tool_card">
    <b-card-header>
      <b-container>
        <b-row class="row_1">
          <b-col class="text-left"><b-icon-wrench/></b-col>
          <b-col class="text-center"> {{ label }} </b-col>
          <b-col class="text-right">
            <b-button v-if="encodingBtn" class="rotate_encoding_btn" @click="$emit('rotate-encoding')" size="sm">
              <b-icon-vector-pen/>
            </b-button>
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
export default {
  props: {
    label: String,
    headerAddon: String,
    encodingBtn: Boolean,
  }
}
</script>

<style>
.row_1 {
  line-height: 2.6em;
}
.row_2 {
  font-size: 0.875rem;
}
</style>
