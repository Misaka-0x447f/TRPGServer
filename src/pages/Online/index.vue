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
    padding: 25%;
    box-sizing: border-box;
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
