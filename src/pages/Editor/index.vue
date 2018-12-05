<template>
  <div class="root">
    <div class="container">
      <side
        class="overlay-side-view"
        :visualName="e('fileMenu')"
      >

      </side>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .overlay-side-view {
    display: fixed;
    right: 0;
    height: 100vh;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import SideTab from "./SideTab/index.vue";
  import say from "@/utils/i18n";

  export default Vue.extend({
    name: "editorIndex",
    components: {
      side: SideTab
    },
    data: () => {
      return {
        e: say
      };
    }
  });
</script>
