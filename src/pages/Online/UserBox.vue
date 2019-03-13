<template>
  <div class="root">
    <div class="container">
      <bu
        v-if="isLoggedIn"
        @click="logOut"
        inline
      >
        {{e(ns, "logOut")}}
      </bu>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    float: right;
    margin-top: 2em;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {ns} from "@/interfaces/Online";
  import {say} from "@/utils/i18n";
  import bu from "@/components/InputField/Button.vue";
  import {Env, LocalStorage} from "@/utils/ls";

  export default Vue.extend({
    name: "UserBox",
    components: {
      bu
    },
    data: () => {
      return {
        ns,
        e: say
      };
    },
    computed: {
      isLoggedIn(): boolean {
        return Env.exist(LocalStorage.user);
      }
    },
    methods: {
      logOut() {
        Env.clr(LocalStorage.user);
        // TODO: re-login not done
        this.$router.push("/");
      }
    }
  });
</script>
