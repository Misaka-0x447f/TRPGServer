<template>
  <div class="root">
    <div class="container">
      <wp></wp>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    width 100vw
    height 100vh
    overflow hidden
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import WallPaper from "@/pages/_public/Wallpaper.vue";
  
  export default Vue.extend({
    name: "editorIndex",
    components: {
      wp: WallPaper
    }
  });
</script>
