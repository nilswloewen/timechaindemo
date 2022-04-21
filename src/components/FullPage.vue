<template>
<full-page id="fullpage" :options="fullpageOptions">
  <div :id="id" class="section">
    <slot/>
  </div>
</full-page>
</template>

<script>
export default {
  props: {
    id: String
  },
  data() {
    return {
      fullpageOptions: {
        licenseKey: '2C8168FC-415648B7-B94C4003-80F51EAC',

        scrollingSpeed: 1500,
        scrollBar: false,
        scrollOverflow: true,

        autoScrolling: true,
        keyboardScrolling: true,
        navigation: false,
        slidesNavigation: true,
        slidesNavPosition: 'top',
        normalScrollElements: '.container .blockchain_wrapper .value .page_content',

        scrollOverflowReset: true,
        scrollOverflowResetKey: 'dGltZWNoYWluZGVtby5pb19VTW5jMk55YjJ4c1QzWmxjbVpzYjNkU1pYTmxkQT09T0to',
      },
    };
  },
};
</script>
