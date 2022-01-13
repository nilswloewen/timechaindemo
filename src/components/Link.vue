<template>
<a :href="href" rel="noopener noreferrer" target="_blank">
  <slot/>
</a>
</template>

<script>
export default {
  props: {
    href: String,
  },
};
</script>
