<template>
  <div class="root">
    <wp></wp>
    <stat></stat>
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
  import {Env, LocalStorage} from "@/utils/ls";
  import scope from "./ScopeSelect/ScopeSelect.vue";
  import stat from "./UserBox.vue";

  export default Vue.extend({
    name: "OnlineIndex",
    components: {
      user,
      wp,
      scope,
      stat
    },
    mounted() {
      if (!Env.exist(LocalStorage.user)) {
        this.$router.push("/online");
      } else {
        this.$router.push("/online/scope");
      }
    }
  });
</script>
