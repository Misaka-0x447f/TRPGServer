<template>
  <div class="root">
    <div class="container">
      <div class="tab-tags">
        <tag icon="user-friends" :queueOrder="0" isActive>
          {{e("fileMenu")}}
        </tag>
        <tag icon="low-vision" :queueOrder="1">
          {{e("viewMenu")}}
        </tag>
        <tag icon="low-vision" :queueOrder="2">
          {{e("viewMenu")}}
        </tag>
        <tag icon="low-vision" :queueOrder="3">
          {{e("viewMenu")}}
        </tag>
      </div>
      <div class="vs"></div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    display: flex;
    flex-direction: row;
    position: fixed;
    right: 0;
  }

  .tab-tags {
    display: flex;
    flex-direction: column;
  }

  .vs {
    width: 0.2em;
    height: 100vh;
    background: sidebar-edge-1;
  }
  
  .vs.active {
    background: sidebar-edge-active-0;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import TagView from "./TagView.vue";
  import TagViewPadding from "./TagViewPadding.vue";
  import say from "@/utils/i18n";

  export default Vue.extend({
    name: "sidebarIndex",
    components: {
      tag: TagView,
      tagP: TagViewPadding
    },
    data: () => {
      return {
        e: say
      };
    }
  });
</script>
