<template>
<InfoCard title="Blockchain Stats">
  <table class="text-center">
    <thead>
    <tr>
      <th></th>
      <th>Estimated</th>
      <th>Actual</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <th>Average number of Guesses</th>
      <td>~{{ estAvgGuesses.toFixed() }}</td>
      <td>{{ avgGuesses }}</td>
    </tr>
    <tr v-if="avgTime">
      <th>Average time to mine each block</th>
      <td>~{{ estAvgTime }}</td>
      <td>{{ avgTime }}</td>
    </tr>
    </tbody>
  </table>
</InfoCard>
</template>
<script>
import InfoCard from '@/components/cards/InfoCard';

export default {
  components: { InfoCard },
  props: {
    avgGuesses: Number,
    avgTime: Number,
    estAvgGuesses: Number,
    estAvgTime: Number,
  },
}
</script>
