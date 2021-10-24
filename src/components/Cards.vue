<template>
  <b-container>
    <b-row>
      <b-col>
        <b-card
            :title=title
            tag="article"
            style="max-width: 20rem;"
            class="mb-2">
          <b-card-text>{{body}}</b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

export default {
  props: [
    'title',
    'body',
  ],
  data() {
    return {
      meals: []
    };
  },
  mounted() {
    console.log("HTML", this.$el.innerText);
  }
};
</script>
