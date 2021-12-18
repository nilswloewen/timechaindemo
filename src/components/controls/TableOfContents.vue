<template>
<b-card id="table_of_contents" class="mt-4">
  <h4>Table of Contents</h4>
  <hr class="mt-0">

  <b-table-simple borderless small>
    <b-tbody>
      <template v-for="section in contents">
        <b-tr :key="section.anchor"
              :data-menuanchor="section.anchor" @click="moveTo(section.anchor, 0)">
          <b-td>
            <a :href="`#${section.anchor}`"> {{ section.label }} </a>
          </b-td>
        </b-tr>

        <template v-if="section.slides">
          <b-tr v-for="(slide, index) in section.slides" :key="slide.anchor"
                :data-menuanchor="slide"
                @click="moveTo(section.anchor, index + 1)">
            <b-td>
              <a :href="`#${slide.anchor}`" class="ml-4">
                {{ slide.label }}
              </a>
            </b-td>
          </b-tr>
        </template>

      </template>
    </b-tbody>
  </b-table-simple>
</b-card>
</template>

<script>
export default {
  props: {
    contents: {
      type: Array,
    },
  },
};
</script>

<style>
.table {
  margin-bottom: 0;
  color: white;
}

#table_of_contents {
  margin-left: auto;
  margin-right: auto;
  max-width: 300px;
}

#table_of_contents a {
  padding-left: 1rem;
  text-decoration: none;
}

#table_of_contents tr {
  cursor: pointer;
}
</style>
