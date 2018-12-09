<template>
  <div class="root">
    <div class="container">
      <wp></wp>
      <side
        class="overlay-side-view"
      >
      </side>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    width 100vw
    height 100vh
    overflow hidden
  }

  .overlay-side-view {
    display: fixed;
    top: 0;
    height: 100vh;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import SideTab from "./SideTab/index.vue";
  import WallPaper from "@/pages/_public/Wallpaper.vue";
  import say from "@/utils/i18n";

  export default Vue.extend({
    name: "editorIndex",
    components: {
      side: SideTab,
      wp: WallPaper
    },
    data: () => {
      return {
        e: say
      };
    }
  });
</script>
