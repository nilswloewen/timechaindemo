<template>
<b-collapse id="collapse_success_msg" :visible="isHashValid">
  <b-card no-body>
    <b-card-header>
      Success!!!
    </b-card-header>
      Congratulations! You've found a valid hash for Block #{{ blockHeight }}!
    <b-list-group-item class="list-field">Estimated average number of tries</b-list-group-item>
    <b-list-group-item class="list-value">{{ avgHashes.toLocaleString() }}</b-list-group-item>

    <b-list-group-item class="list-field">Real number of tries</b-list-group-item>
    <b-list-group-item class="list-value">{{ numOfTries }}</b-list-group-item>

    <b-button @click="slideLeft"><b-icon-arrow-left/> Add the next block</b-button>
  </b-card>
</b-collapse>
</template>

<script>
export default {
  props: {
    avgHashes: Number,
    blockHeight: Number,
    isHashValid: Boolean,
    numOfTries: Number,
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
  box-shadow: -1px 2px 5px 0 #f79413;
}
#collapse_success_msg .card-header {
  background-color: #f79413;
}
</style>
