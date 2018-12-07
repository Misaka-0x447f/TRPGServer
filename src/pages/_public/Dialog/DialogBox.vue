<template>
  <div class="root">
    <div class="dialogbox-container">
      <!-- slot is a special tag for vue that allows to insert another component into. -->
      <slot></slot>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .dialogbox-container
    background-color container-background-0
    padding 0.5em 1em
</style>
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "DialogBox"
  });
</script>
