<template>
  <div class="root">
    <div class="container">
      <div class="inner-container">
        <dia
          :title="e(ns, 'setName')"
          isNetRelated
        >
          <inp
            v-model="usernameInputs"
            :label="e(ns, 'friendlyName')"
            placeholder=""
            class="inp"
          ></inp>
          <span class="desc">{{e(ns, "setNameDesc")}}</span>
          <template slot="footer">
            <div v-if="userExist" class="user-exist">
              {{e(ns, "userExist")}}
            </div>
            <bu @click="tryReg" :throttle="5000">
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

  .user-exist {
    margin-right: auto;
    height: 2em;
    line-height: 2em;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {ns} from "@/interfaces/Online";
  import {say} from "@/utils/i18n";
  import inp from "@/components/InputField/Input.vue";
  import bu from "@/components/InputField/Button.vue";
  import {In, Out, regResponse} from "../../../serverInterfaces/userReg";
  import dia from "@/components/Dialogs/Simple/index.vue";
  import state from "@/utils/state";
  import {events} from "../../../serverInterfaces";
  import {link} from "@/utils/ws";
  import {Env, LocalStorage} from "@/utils/ls";
  import {timeout} from "@/utils/lang";

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
        userExist: false
      };
    },
    mounted() {
      const regHandler = async (m: In) => {
        if (m.result === regResponse.ok) {
          state.online.user = m.user;
          state.online.uid = m.uid;
          this.userExist = false;
          await this.registerSuccessListener(m);
        } else if (m.result === regResponse.exist) {
          this.userExist = true;
        }
      };
      link.RX(events.reg, regHandler);
    },
    methods: {
      tryReg() {
        link.TX(events.reg, {
          username: this.usernameInputs
        } as Out);
      },
      async registerSuccessListener(m: In) {
        Env.set(LocalStorage.user, m);
        await timeout(10);
        this.$router.push("/online/scope");
      }
    }
  });
</script>
