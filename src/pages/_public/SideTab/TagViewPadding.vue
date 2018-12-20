<template functional>
  <div class="root">
    <div class="container">
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    clip-path: polygon(0 0, 100% 0, 100% 100%);
    background: sidebar-edge-0;
    height: 2em;
    margin-bottom: -2em;
  }
</style>
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "TagViewPadding"
  });
</script>
