<template>
  <div class="root">
    <div class="container">
      <div>
        {{e(ns, "registerTitle")}}
      </div>
      <div>
        {{e(ns, "registerDesc")}}
      </div>
      <inp v-model="usernameInputs"></inp>
      <bu :callback="tryReg"></bu>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
</style>
<script lang="ts">
  import Vue from "vue";
  import {ns} from "@/interfaces/Online";
  import {say} from "@/utils/i18n";
  import inp from "@/components/InputField/Input.vue";
  import bu from "@/components/InputField/Button.vue";
  import {Comm} from "@/utils/wsLimiter";
  import {Method} from "../../../serverInterfaces";
  import {Out} from "../../../serverInterfaces/RegisterUser";

  export default Vue.extend({
    name: "RegisterUser",
    components: {
      inp,
      bu
    },
    data: () => {
      return {
        e: say,
        ns,
        usernameInputs: "",
        networkRequestInProgress: false
      };
    },
    methods: {
      tryReg() {
        const tunnel = new Comm();
        tunnel.send(Method.reg, {
          user: this.usernameInputs
        } as Out);
        tunnel.registerListener((e) => {
          console.log(e);
        });
      }
    }
  });
</script>
