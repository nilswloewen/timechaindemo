<template>
  <b-card id="table_of_contents" no-body>
    <b-card-header>
      Table of Contents:
    </b-card-header>

    <b-table-simple hover small striped>
      <b-tbody>
        <template v-for="section in contents">
          <b-tr @click="moveTo(section.anchor, 0)"
                :key="section.anchor" :data-menuanchor="section.anchor">
            <b-td>
              <a :href="`#${section.anchor}`"> {{ formatTitle(section.anchor) }} </a>
            </b-td>
          </b-tr>

          <template v-if="section.slides">
            <b-tr v-for="(slide, index) in section.slides" :key="slide.anchor"
                  :data-menuanchor="slide"
                  @click="moveTo(section.anchor, index + 1)">
              <b-td>
                <a class="slide_link" :href="`#${slide.anchor}`">
                  {{ formatTitle(slide.anchor) }}
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
  methods: {
    formatTitle(text) {
      const noUnderscore = text.replace(/_/g, ' ');
      return noUnderscore.replace(/(\w+)/g, (word) => word[0].toUpperCase() + word.slice(1));
    },
  },
};
</script>

<style>
  #table_of_contents {
    margin-left: auto;
    margin-right: auto;
    max-width: 300px;
  }
  #table_of_contents .card-header {
    font-weight: bold;
  }
  .slide_link {
    margin-left: 1em;
  }

  #table_of_contents a {
    padding-left: 1rem;
    color: black;
    text-decoration: none;
  }
  #table_of_contents tr {
    cursor: pointer;
  }

  ul {
    list-style-type: none;
  }

</style>
