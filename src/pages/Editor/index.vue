<template>
  <div class="root">
    <div class="container">
      <wp></wp>
      <pe :content="generatedContent"></pe>
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
  import PropEditor from "./PropertyEditor/index.vue";
  import {checksumAlgorithm, checksumDataSource, Property} from "@/utils/PropertyEditor";

  export default Vue.extend({
    name: "editorIndex",
    components: {
      wp: WallPaper,
      pe: PropEditor
    },
    computed: {
      generatedContent(): Property {
        return {
          checksum: {
            algorithm: checksumAlgorithm.sha1,
            checksum: "123",
            source: checksumDataSource.gen
          },
          data: [
            {
              id: "test",
              value: "123",
              text: "test value"
            }
          ]
        };
      }
    }
  });
</script>
