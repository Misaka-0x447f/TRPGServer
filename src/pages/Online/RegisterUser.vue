<template>
  <div class="root">
    <div class="container">
      <div class="inner-container">
        <dia
          :title="e(ns, 'registerTitle')"
        >
          <div class="content">
            <inp
              v-model="usernameInputs"
              :label="e(ns, 'username')"
              placeholder=""
            ></inp>
            <span>{{e(ns, "registerDesc")}}</span>
            <bu :callback="tryReg">
              <span class="ok">{{e("global", "ok")}}</span>
            </bu>
          </div>
        </dia>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    height: 100%;
  }

  .inner-container {
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content > div {
    margin: 0.5em 0;
  }

  .ok {
    padding: 0 2em;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {ns} from "@/interfaces/Online";
  import {say} from "@/utils/i18n";
  import inp from "@/components/InputField/Input.vue";
  import bu from "@/components/InputField/Button.vue";
  import {Comm} from "@/utils/ws";
  import {Method} from "../../../serverInterfaces";
  import {Out} from "../../../serverInterfaces/RegisterUser";
  import dia from "@/components/Dialogs/Simple/index.vue";

  export default Vue.extend({
    name: "RegisterUser",
    components: {
      inp,
      bu,
      dia
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
          console.log(e.data);
        });
      }
    }
  });
</script>
