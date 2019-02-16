import {namespace} from "../../../serverInterfaces";
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
            <bu :callback="tryReg" :throttle="5000">
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
  import {events, In, Out, regResponse} from "../../../serverInterfaces/userReg";
  import dia from "@/components/Dialogs/Simple/index.vue";
  import state from "@/utils/state";
  import {namespace} from "../../../serverInterfaces";
  import {ioOf} from "@/utils/socket";

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
        userExist: false
      };
    },
    mounted() {
      const regHandler = (m: In) => {
        console.log(1);
        if (m.data.result === regResponse.ok) {
          state.online.user = m.data.user;
          state.online.uid = m.data.uid;
          console.log(JSON.stringify(state.online));
          this.callback();
        } else if (m.data.result === regResponse.exist) {
          this.userExist = true;
        }
      };
      // ioOfConnect(namespace.reg).on(events.reg, regHandler);
    },
    methods: {
      tryReg() {
        ioOf(namespace.reg).emit(events.reg, {
          data: {
            username: this.usernameInputs
          }
        } as Out);
        ioOf(namespace.reg).on(events.reg, () => {
          console.log(1);
        });
      }
    }
  });
</script>
