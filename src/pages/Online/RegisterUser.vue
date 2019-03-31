<template>
  <div class="root">
    <st></st>
    <div class="container">
      <div class="inner-container">
        <dia
          :title="e(ns, 'setName')"
          isNetRelated
        >
          <div @keypress.enter="tryReg">
            <inp
              v-model="usernameInputs"
              :label="e(ns, 'friendlyName')"
              @input="userNameChange"
            ></inp>
            <inp
              v-show="status !== stat.empty"
              v-model="uidInputs"
              :label="e(ns, 'uid')"
            >
            </inp>
          </div>
          <div class="desc">{{e(ns, "setNameDesc")}}</div>
          <template slot="footer">
            <div v-if="status === stat.userExist" class="user-tip">
              {{e(ns, "userExist")}}
            </div>
            <div v-if="status === stat.validateFailed" class="user-tip">
              {{e(ns, "validateFailed")}}
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

  .ok {
    padding: 0 2em;
  }

  .desc {
    margin-top: 0.5em;
    color: plain-text-0-hints;
  }

  .user-tip {
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
  import st from "@/components/SideTab/index.vue";
  import {removeSpace} from "@/utils/lang";

  enum stat {
    empty,
    userExist,
    validateFailed
  }

  export default Vue.extend({
    name: "RegisterUser",
    components: {
      inp,
      bu,
      dia,
      st
    },
    data: () => {
      return {
        e: say,
        ns,
        usernameInputs: "",
        uidInputs: "",
        status: stat.empty,
        stat
      };
    },
    mounted() {
      const regHandler = (m: In) => {
        if (m.result === regResponse.ok) {
          state.online.user = m.user;
          state.online.uid = m.uid;
          Env.set(LocalStorage.user, m);
          this.$router.push("/online/namespace");
        } else if (m.result === regResponse.exist) {
          this.status = stat.userExist;
        } else if (m.result === regResponse.rejected) {
          this.status = stat.validateFailed;
        }
      };
      link.RX(events.reg, regHandler);
    },
    methods: {
      tryReg() {
        this.status = stat.empty;
        if (this.uidInputs === "") {
          link.TX(events.reg, {
            user: this.usernameInputs
          } as Out);
        } else {
          link.TX(events.reg, {
            user: this.usernameInputs,
            uid: removeSpace(this.uidInputs)
          } as Out);
        }
      },
      userNameChange() {
        this.status = stat.empty;
        this.uidInputs = "";
      }
    }
  });
</script>
