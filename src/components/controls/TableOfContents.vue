<template>
<b-card id="table_of_contents" no-body class="mt-4">
  <b-card-header>
    Table of Contents:
  </b-card-header>

  <b-table-simple hover small striped>
    <b-tbody>
      <template v-for="section in contents">
        <b-tr @click="moveTo(section.anchor, 0)"
              :key="section.anchor" :data-menuanchor="section.anchor">
          <b-td>
            <a :href="`#${section.anchor}`"> {{ section.label }} </a>
          </b-td>
        </b-tr>

        <template v-if="section.slides">
          <b-tr v-for="(slide, index) in section.slides" :key="slide.anchor"
                :data-menuanchor="slide"
                @click="moveTo(section.anchor, index + 1)">
            <b-td>
              <a class="ml-4" :href="`#${slide.anchor}`">
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
      type: Array
    }
  }
};
</script>

<style>
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
