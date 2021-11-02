<template>
  <b-collapse id="collapse_legend">
    <b-card id="legend" no-body>
      <b-card-header style="float: right;">
        <span v-b-toggle.collapse_legend >
          <b-icon-chevron-compact-up />
          Legend
        </span>

        <b-button @click="onClickEncoding" variant="info" size="sm"
                  class="d-inline-block" style="min-width: 132px; float: right;" >
          {{ this.encoding[0].replace(/^\w/, c => c.toUpperCase()) }}
        </b-button>
      </b-card-header>

      <!--  Max -->
      <b-list-group-item class="list-field border-bottom-0"> Max </b-list-group-item>
      <b-list-group-item class="list-value">{{ this.hashMax[this.encoding[0]] }} </b-list-group-item>

      <!-- Target -->
      <b-list-group-item class="list-field border-bottom-0" style="color: green;">
        TARGET &nbsp;{{ this.targetOdds }}% of Max
      </b-list-group-item>
      <b-list-group-item class="list-value" style="color: green;">{{ this.target[this.encoding[0]] }} </b-list-group-item>

      <!-- Hash -->
      <b-list-group-item class="list-field border-bottom-0">
        HASH &nbsp;&nbsp;{{ this.hashOdds }}% of Max
      </b-list-group-item>
      <b-list-group-item class="list-value">{{ this.hash[this.encoding[0]] }} </b-list-group-item>
    </b-card>
  </b-collapse>
</template>

<script>
  export default {
    props: {
      encoding: [],
      hashMax: {},
      hash: {},
      target: {},
    },
    data() {
      return {
        width: Number,
        targetOdds: String,
        hashOdds: String,
        oddsLength: 9,
      }
    },
    mounted() {
      this.setTargetOdds();
      this.setHashOdds();
    },
    methods: {
      onClickEncoding() {
        this.$emit('rotateEncoding');
      },
      calcOddsLength() {
        const percent = (this.target.yRatio * 100);
        const string = percent.toFixed(30).toString();
        for (let i = 2; i < string.length; i += 1) {
          if (string.charAt(i) !== '0') {
            this.oddsLength = i;
            break;
          }
        }
      },
      setHashOdds() {
        this.hashOdds = (this.hash.yRatio * 100).toFixed(this.oddsLength).toString().padStart(this.oddsLength + 3, ' ');
      },
      setTargetOdds() {
        this.targetOdds = (this.target.yRatio * 100).toFixed(this.oddsLength);
      },
    },
    watch:{
      target() {
        this.calcOddsLength();
        this.setTargetOdds();
        this.setHashOdds();
      },
      hash() {
        this.setHashOdds();
      },
      encoding() {
        // TODO: Make width beautiful again!
        switch (this.encoding) {
          case 'hexadecimal':
            this.width = 'auto';
            break;
          case 'decimal':
            this.width = 'auto';
            break;
          case 'exponential':
            this.width = 'auto';
            break;
          case 'binary':
          default:
            this.width = 2480;
            break;
        }
      }
    }

  }
</script>

<style>
  #legend {
    word-wrap: normal;
    overflow-x: auto;
  }
</style>
