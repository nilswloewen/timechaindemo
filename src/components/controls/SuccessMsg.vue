<template>
<b-collapse id="collapse_success_msg" :visible="isHashValid">
  <InfoCard title="Congratulations!">
    <b-card-body>
      You found a valid hash for Block #{{ blockHeight }}!

      <hr>
      <div>
        It took <b>{{ numOfTries }}</b> guesses
      </div>
      <div>
        <b>~{{ avgHashes.toFixed() }}</b> were estimated
      </div>

      <template v-if="estTime">
        <hr>
        <div>
          It took <b>{{ timeToMine.toFixed(2) }}</b> seconds to mine
        </div>
        <div>
          <b>~{{ estTime.blocktime }}</b> {{ estTime.blocktimeUnit.toLowerCase() }} were estimated
        </div>
      </template>

      <div class="text-center mt-2">
        <b-button variant="primary" @click="slideLeft">
          <b-icon-arrow-left/>
          Add the next block
        </b-button>
      </div>
    </b-card-body>
  </InfoCard>
</b-collapse>
</template>

<script>
import InfoCard from '@/components/cards/InfoCard';

export default {
  components: { InfoCard },
  methods: {
    slideLeft() {
      fullpage_api.moveSlideLeft();
    },
  },
  props: {
    avgHashes: Number,
    blockHeight: Number,
    estTime: Object,
    isHashValid: Boolean,
    numOfTries: Number,
    timeToMine: Number,
  },
};
</script>

<style>
#collapse_success_msg .card {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);
  max-width: 388px;
}
</style>
