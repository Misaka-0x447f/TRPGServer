<template>
  <div class="root">
    <div class="container">
      <tag icon="user-friends" isActive>
        {{e("fileMenu")}}
      </tag>
      <tag icon="low-vision">
        {{e("viewMenu")}}
      </tag>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    display: flex;
    flex-direction: column;
  }

  .tag {

  }
</style>
<script lang="ts">
  import Vue from "vue";
  import TagView from "./TagView.vue";
  import say from "@/utils/i18n";

  export default Vue.extend({
    name: "sidebarIndex",
    components: {
      tag: TagView
    },
    data: () => {
      return {
        e: say
      };
    }
  });
</script>
