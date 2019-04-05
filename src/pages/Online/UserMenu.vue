<template>
  <div class="root">
    <div class="container">
      <div class="username">
        {{Env.get(LocalStorage.__auth)["user"]}}
      </div>
      <div>
        <div class="info">
          <div class="code">
            {{Env.get(LocalStorage.__auth)['credential']}}
          </div>
          <div>
            {{e(ns, "logOutDesc")}}
          </div>
        </div>
        <bu
          @click="logOut"
          danger
        >
          {{e(ns, "logOut")}}
        </bu>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .username {
    font-size: 1.5em;
  }

  .code {
    font-family: font-monospace;
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
  import {Env, LocalStorage, logOut} from "@/utils/ls";

  import txt from "@/components/InputField/Input.vue";
  import bu from "@/components/SideTab/SideTabContents/Button.vue";

  export default Vue.extend({
    name: "UserBox",
    components: {
      txt,
      bu
    },
    data: () => {
      return {
        ns,
        e: say,
        uid: "",
        Env,
        LocalStorage,
        logOut
      };
    }
  });
</script>
