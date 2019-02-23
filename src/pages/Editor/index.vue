<template>
  <div class="root">
    <wp></wp>
    <div class="container">
      <ne class="generator"></ne>
      <div class="vs">
        <vs></vs>
      </div>
      <pe
        class="propertyEditor"
        :isReadOnly="true"
        :content="state.editor.storage.definition"
      ></pe>
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
  import saveAs from "file-saver";
  import {sideTab} from "@/main";
  import {ico} from "@/utils/FontAwesome";
  import {MenuStyle} from "@/utils/SideTabHandler";

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
    },
    mounted() {
      sideTab.updateTab({
        fileMenu: {
          icon: ico.fileCode,
          children: [
            {
              name: {
                scope: "propertyEditor",
                key: "export"
              },
              style: MenuStyle.click,
              handler: this.saveFile,
            },
            {
              name: {
                scope: "propertyEditor",
                key: "fileOperateTips"
              },
              style: MenuStyle.textarea
            }
          ]
        }
      });
    },
    beforeDestroy() {
      sideTab.destroyTab({
        fileMenu: [
          {
            scope: "propertyEditor",
            key: "export"
          },
          {
            scope: "propertyEditor",
            key: "fileOperateTips"
          }
        ]
      });
    },
    methods: {
      saveFile() {
        // @ts-ignore
        saveAs(new File([JSON.stringify(state.editor.storage)], "character.json"));
      }
    }
  });
</script>
