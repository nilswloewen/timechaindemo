<template>
<b-collapse id="collapse_success_msg" :visible="isHashValid">
  <b-card no-body>
    <b-card-header>
      Success!!!
    </b-card-header>
    <b-card-body>
      Congratulations! You've found a valid hash for Block #{{ blockHeight }}!
      <hr>

      <p>
      It took <b>{{ numOfTries }}</b> tries to find a valid hash,
        <b>{{ avgHashes.toLocaleString() }}</b> were estimated.
      </p>

      <p v-if="estTime">
        It took {{ timeToMine }} seconds to mine, {{ estTime.blocktime }} {{ estTime.blocktimeUnit }} were estimated.
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
#collapse_success_msg {
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
}
</style>
