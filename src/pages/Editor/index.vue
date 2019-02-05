<template>
  <div class="root">
    <wp></wp>
    <div class="container">
      <ne class="generator"></ne>
      <div class="vs">
        <vs></vs>
      </div>
      <pe class="propertyEditor" :isReadOnly="true" :content="state.editor.storage"></pe>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    height 100%;
    box-sizing: border-box;
    overflow hidden;
    display: flex;
    padding: 1em;
  }

  .generator, .propertyEditor {
    flex: 15;
  }

  .vs {
    margin: 0 1em;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import WallPaper from "@/components/Wallpaper.vue";
  import PropEditor from "./PropertyEditor/index.vue";
  import ne from "./Generators/Nechronica/index.vue";
  import vs from "@/components/VerticalSplitter.vue";
  import state from "@/utils/state";

  export default Vue.extend({
    name: "editorIndex",
    components: {
      wp: WallPaper,
      pe: PropEditor,
      ne,
      vs
    },
    data() {
      return {
        state
      };
    }
  });
</script>
