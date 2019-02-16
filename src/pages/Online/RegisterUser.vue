import {regResponse} from "../../../serverInterfaces/userReg";
import {regResponse} from "../../../serverInterfaces/userReg";
<template>
  <div class="root">
    <div class="container">
      <div class="inner-container">
        <dia
          :title="e(ns, 'setName')"
        >
          <inp
            v-model="usernameInputs"
            :label="e(ns, 'friendlyName')"
            placeholder=""
            class="inp"
          ></inp>
          <span class="desc">{{e(ns, "setNameDesc")}}</span>
          <template slot="footer">
            <div v-if="userExist">
              {{e(ns, "userExist")}}
            </div>
            <div v-if="networkRequestError">
              {{e(ns, "networkError")}}
            </div>
            <bu :callback="tryReg" :throttle="2000">
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
  import {In, Out, regResponse} from "../../../serverInterfaces/userReg";
  import dia from "@/components/Dialogs/Simple/index.vue";

  export default Vue.extend({
    name: "RegisterUser",
    components: {
      inp,
      bu,
      dia
    },
    props: {
      callback: {
        type: Function as unknown as () => (() => void)
      }
    },
    data: () => {
      return {
        e: say,
        ns,
        usernameInputs: "",
        networkRequestInProgress: false,
        networkRequestError: false,
        userExist: false,
        tunnel: new Comm()
      };
    },
    methods: {
      tryReg() {
        this.tunnel.registerListener((e) => {
          this.networkRequestInProgress = false;
          if ((e as In).data.result === regResponse.exist) {
            this.userExist = true;
          } else if ((e as In).data.result === regResponse.ok) {
            this.callback();
          } else {
            this.networkRequestError = true;
          }
        });
        this.tunnel.registerErrorListener((e) => {
          this.networkRequestInProgress = false;
          this.networkRequestError = true;
        });
        this.networkRequestError = false;
        this.userExist = false;
        if (this.tunnel.send(Method.reg, {
          data: {
            username: this.usernameInputs
          }
        } as Out)) {
          this.networkRequestInProgress = true;
        }
      }
    }
  });
</script>
