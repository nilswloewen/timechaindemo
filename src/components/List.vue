<template>
  <b-list-group :id="id" class="list">
    <template v-for="item in items">
      <b-list-group-item :key="item.field" class="list-field border-bottom-0"> {{ item.field }} </b-list-group-item>
      <b-list-group-item :key="item.value" class="list-value"> {{ item.value }} </b-list-group-item>
    </template>
  </b-list-group>
</template>

<script>
  export default {
    props: {
      id: String,
      items: {
        type: Array,
        default: () => {
          return [
            {field: "Field", value: "Value"}
          ]
        }
      }
    },
  };
</script>

<style>
    .list {
        overflow-x: scroll;
    }
    .list-group-item.list-field {
        font-weight: lighter;
        font-style: italic;
    }
</style>
