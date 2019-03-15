<template>
  <div class="root">
    <div class="container">
      <bu
        v-if="isLoggedIn"
        @click="showDialog = !showDialog"
        inline
      >
        {{Env.get(LocalStorage.user)["user"]}}
      </bu>
      <div v-show="showDialog" class="userBox">
        <div class="info">
          <div class="code nowrap">
            {{Env.get(LocalStorage.user)['uid']}}
          </div>
          <div class="nowrap">
            {{e(ns, "logOutDesc")}}
          </div>
        </div>
        <bu
          @click="logOut"
          theme="red"
        >
          {{e(ns, "logOut")}}
        </bu>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    float: right;
    text-align: right;
    margin-top: 2em;
    position: relative;
  }

  .userBox {
    position: absolute;
    right: 0;
    min-width: 15em;
    background-color: dialog-background-0;
    padding: 1em;
    z-index: 1;
  }

  .code {
    font-family: font-monospace
  }

  .info {
    margin-bottom: 0.5em;
  }

  .nowrap {
    display: inline-block;
    white-space: nowrap;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {ns} from "@/interfaces/Online";
  import {say} from "@/utils/i18n";
  import bu from "@/components/InputField/Button.vue";
  import {Env, LocalStorage} from "@/utils/ls";
  import {timeout} from "@/utils/lang";
  import txt from "@/components/InputField/Input.vue";

  export default Vue.extend({
    name: "UserBox",
    components: {
      bu,
      txt
    },
    data: () => {
      return {
        ns,
        e: say,
        isLoggedIn: false,
        uid: "",
        Env,
        LocalStorage,
        showDialog: false,
      };
    },
    mounted() {
      // noinspection JSIgnoredPromiseFromCall
      this.updateLoginStatus();
    },
    watch: {
      $route() {
        // noinspection JSIgnoredPromiseFromCall
        this.updateLoginStatus();
      }
    },
    methods: {
      logOut() {
        Env.clr(LocalStorage.user);
        // noinspection JSIgnoredPromiseFromCall
        this.updateLoginStatus();
        this.$router.push("/");
      },
      async updateLoginStatus() {
        await timeout(100);
        this.isLoggedIn = Env.exist(LocalStorage.user);
      },
    }
  });
</script>
