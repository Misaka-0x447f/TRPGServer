<template>
  <div class="root">
    <div class="container">
      <wp></wp>
      <pe :isReadOnly="true" :content="generatedContent"></pe>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    height 100%;
    overflow hidden
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import WallPaper from "@/pages/_public/Wallpaper.vue";
  import PropEditor from "./PropertyEditor/index.vue";
  import {Property} from "@/utils/PropertyEditor";

  export default Vue.extend({
    name: "editorIndex",
    components: {
      wp: WallPaper,
      pe: PropEditor
    },
    computed: {
      generatedContent(): Property {
        return {
          data: []
        };
      }
    }
  });
</script>
