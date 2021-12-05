<template>
<b-collapse id="collapse_success_msg" :visible="isHashValid">
  <b-card no-body>
    <b-card-body>
      Congratulations! You found a valid hash for Block #{{ blockHeight }}!
      <hr>

      <p>
        It took <b>{{ numOfTries }}</b> guesses to find a valid hash,
        <b>~{{ avgHashes.toFixed() }}</b> were estimated.
      </p>

      <hr>

      <p v-if="estTime">
        It took <b>{{ timeToMine }}</b> seconds to mine,
        <b>~{{ estTime.blocktime }}</b> {{ estTime.blocktimeUnit }} were estimated.
      </p>
      <div class="text-center">
        <b-button @click="slideLeft"><b-icon-arrow-left/> Add the next block</b-button>
      </div>
    </b-card-body>
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
    timeToMine: Number,
    estTime: Object,
  },
  methods: {
    slideLeft() {
      fullpage_api.moveSlideLeft()
    }
  }
}
</script>

<style>
#collapse_success_msg .card {
  border-color: #f79413;
  box-shadow: -2px 3px 10px 2px #f79413;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
