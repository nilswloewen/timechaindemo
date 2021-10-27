<template>
  <b-collapse id="collapse_legend" visible>
    <b-card id="legend" no-body>
      <b-card-header v-b-toggle.collapse_legend>
        <b-icon-chevron-compact-up />
        Legend
      </b-card-header>

        <b-list-group :width="this.width">
          <!--  Max -->
          <b-list-group-item class="list-field border-bottom-0"> Max </b-list-group-item>
          <b-list-group-item class="list-value">{{ this.hashMax[this.encoding] }} </b-list-group-item>

          <!-- Target -->
          <b-list-group-item class="list-field border-bottom-0" style="color: green;">
            TARGET &nbsp;{{ (this.target.yRatio * 100).toFixed(24) }}%
          </b-list-group-item>
          <b-list-group-item class="list-value" style="color: green;">{{ this.target[this.encoding] }} </b-list-group-item>

          <!-- Hash -->
          <b-list-group-item class="list-field border-bottom-0">
            HASH &nbsp;&nbsp;&nbsp;{{ (this.hash.yRatio * 100).toFixed(24) }}%
          </b-list-group-item>
          <b-list-group-item class="list-value">{{ this.hash[this.encoding] }} </b-list-group-item>
        </b-list-group>
    </b-card>
  </b-collapse>
</template>

<script>
  export default {
    props: {
      encoding: String,
      hashMax: {},
      hash: {},
      target: {},
    },
    data() {
      return {
        width: Number
      }
    },
    watch:{
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
