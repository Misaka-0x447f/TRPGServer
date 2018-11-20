<template>
  <div class="container">
    <!-- slot is a special tag for vue that allows to insert another component into. -->
    <slot></slot>
  </div>
</template>
<style lang="stylus" scoped>
</style>
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "DialogBox"
  });
</script>
