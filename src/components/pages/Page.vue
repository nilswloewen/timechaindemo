<template>
  <div class="section" :data-anchor="dataAnchor">
    <b-container>
      <b-row>
        <b-col>
          <slot/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  props: {
    dataAnchor: String,
  },
};
</script>
