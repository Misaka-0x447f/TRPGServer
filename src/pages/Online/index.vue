<template>
  <div class="root">
    <wp></wp>
    <div class="container">
      <user v-if="page === 'register'"></user>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    box-sizing: border-box;
    height: 100%;
  }
  
  .container > div {
    height: 100%;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import wp from "@/components/Wallpaper.vue";
  import user from "./RegisterUser.vue";

  export default Vue.extend({
    name: "OnlineIndex",
    components: {
      user,
      wp
    },
    data: () => {
      return {
        page: "register"
      };
    }
  });
</script>
