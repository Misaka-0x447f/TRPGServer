<template>
  <div class="root">
    <wp></wp>
    <div class="container">
      <router-view class="view"></router-view>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    box-sizing: border-box;
    height: 100%;
    display: flex;
  }

  .container > div {
    height: 100%;
  }

  .view {
    width: 100%;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  
  import wp from "@/components/Wallpaper.vue";
  import user from "./RegisterUser.vue";
  import scope from "./Namespace/index.vue";

  export default Vue.extend({
    name: "OnlineIndex",
    components: {
      user,
      wp,
      scope
    }
  });
</script>
