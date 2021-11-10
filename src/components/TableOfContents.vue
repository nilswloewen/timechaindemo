<template>
  <div>

    Table of Contents:
    <ul class="sections">
      <li v-for="section in contents" :key="section.anchor"
          :data-menuanchor="section.anchor">
        <a :href="`#${section.anchor}`"> {{ formatTitle(section.anchor) }} </a>

        <template v-if="typeof section.slides !== 'undefined'">
          <ul class="slides">
            <li v-for="(slide, index) in section.slides" :key="slide.anchor"
                :data-menuanchor="slide">
              <a :href="`#${slide.anchor}`"
                 @click="fullpage_api.moveTo(section.anchor, index)">
                {{ formatTitle(slide.anchor) }} </a>
            </li>
          </ul>
        </template>

      </li>
    </ul>

  </div>
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
