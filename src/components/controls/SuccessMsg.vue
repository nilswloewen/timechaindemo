<template>
<b-collapse id="collapse_success_msg" :visible="isHashValid">
  <b-card no-body class="text-center">
    <b-card-body>
      <h4>Congratulations!</h4>
      You found a valid hash for Block #{{ blockHeight }}!

      <hr>
      <div>
        It took <b>{{ numOfTries }}</b> guesses to find a valid hash
      </div>
      <div>
        <b>~{{ avgHashes.toFixed() }}</b> were estimated
      </div>

      <template v-if="estTime">
        <hr>
        <div>
          It took <b>{{ timeToMine }}</b> seconds to mine
        </div>
        <div>
          <b>~{{ estTime.blocktime }}</b> {{ estTime.blocktimeUnit.toLowerCase() }} were estimated
        </div>
      </template>

      <div class="text-center mt-2">
        <b-button @click="slideLeft"><b-icon-arrow-left/> Add the next block</b-button>
      </div>
    </b-card-body>
  </b-card>
</b-collapse>
</template>

<script>
export default {
  methods: {
    slideLeft() {
      fullpage_api.moveSlideLeft()
    }
  },
  props: {
    avgHashes: Number,
    blockHeight: Number,
    estTime: Object,
    isHashValid: Boolean,
    numOfTries: Number,
    timeToMine: Number,
  }
}
</script>

<style>
#collapse_success_msg .card {
  /*border-color: #f79413;*/
  /*box-shadow: -2px 3px 10px 2px #f79413;*/
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
