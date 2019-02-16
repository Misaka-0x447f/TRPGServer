<template>
  <div class="root">
    <div class="container">
      <div class="inner-container">
        <dia
          :title="e(ns, 'registerTitle')"
        >
          <inp
            v-model="usernameInputs"
            :label="e(ns, 'username')"
            placeholder=""
            class="inp"
          ></inp>
          <span class="desc">{{e(ns, "registerDesc")}}</span>
          <template slot="footer">
            <bu :callback="tryReg">
              <span class="ok">{{e("global", "ok")}}</span>
            </bu>
          </template>
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

  .inp {
    margin-bottom: 0.5em;
  }

  .ok {
    padding: 0 2em;
  }

  .desc {
    color: plain-text-0-hints;
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
