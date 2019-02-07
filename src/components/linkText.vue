<template functional>
  <a :class="props.class" :href="props.href" :target="props.newTab ? '_blank' : '_self'">
    <slot></slot>
  </a>
</template>
<style lang="stylus" scoped>
  a {
    color: link-text-0;
    text-decoration: none;
  }

  a:hover, a:visited {
    color: link-text-0-hover;
    text-decoration: underline;
  }
</style>
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "linkText",
    props: {
      href: {
        type: String
      },
      newTab: {
        type: Boolean,
        default: false
      },
      class: {
        type: String,
        default: ""
      }
    }
  });
</script>
