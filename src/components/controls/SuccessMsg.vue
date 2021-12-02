<template>
<b-collapse id="collapse_success_msg">
  <b-card no-body>
    <b-card-header>
      Success!!!
    </b-card-header>
    <b-card-body>
      Congratulations! You've found a valid hash for Block #{{ blockHeight }}!
      <hr>
      <b-button @click="slideLeft"><b-icon-arrow-left/> Add the next block</b-button>
    </b-card-body>
  </b-card>
</b-collapse>
</template>

<script>
export default {
  props: {
    blockHeight: Number,
  },
  methods: {
    slideLeft() {
      fullpage_api.moveSlideLeft()
    }
  }
}
</script>

<style>
#collapse_success_msg {
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
}
#collapse_success_msg .card {
  text-align: center;
  box-shadow: -1px 2px 5px 0 #f79413;
}
#collapse_success_msg .card-header {
  background-color: #f79413;
}
</style>
