<template>
  <div class="root">
    <div class="container">
      <side
        :visualName="e('fileMenu')"
      >
        <font-awesome-icon
          slot="icon"
          icon="user-friends"
        ></font-awesome-icon>
        
      </side>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
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
