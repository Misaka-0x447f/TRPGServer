<template>
  <div class="root">
    <wp></wp>
    <stat></stat>
    <div class="container">
      <user v-if="showRegisterDialog" :callback="registerSuccessListener"></user>
      <router-view></router-view>
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
  import {In} from "../../../serverInterfaces/userReg";
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
    data: () => {
      return {
        showRegisterDialog: true
      };
    },
    mounted() {
      if (!Env.exist(LocalStorage.user)) {
        this.showRegisterDialog = true;
      } else {
        this.showRegisterDialog = false;
        this.$router.push("/online/scope");
      }
    },
    methods: {
      registerSuccessListener(m: In) {
        Env.set(LocalStorage.user, m);
        this.showRegisterDialog = false;
        this.$router.push("/online/scope");
      }
    }
  });
</script>
