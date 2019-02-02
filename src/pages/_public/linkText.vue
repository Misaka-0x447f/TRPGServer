<template functional>
  <a :class="props.class" :href="props.href" :target="newTab ? '_blank' : ''">
    <slot></slot>
  </a>
</template>
<style lang="stylus" scoped>
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
