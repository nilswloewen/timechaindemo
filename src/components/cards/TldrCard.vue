<template>
<b-card class="tldr_card" no-body>
  <b-card-header>
    <b-container>
      <b-row class="row_1">
        <b-col class="text-center"> {{ title }}</b-col>
      </b-row>
    </b-container>
  </b-card-header>

  <b-card-body>
    <slot/>
  </b-card-body>

</b-card>
</template>

<script>
export default {
  props: {
    title: { type: String, default: 'tl;dr' },
  },
};
</script>

<style>
.row_1 {
  line-height: 2.6em;
}

.card.tldr_card {
  box-shadow: -1px 2px 4px 2px #f79413;
  border-color: #f79413;
}
</style>
