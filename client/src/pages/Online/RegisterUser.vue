import {commEvents} from "../../../../bridge";
<template>
  <div class="root">
    <st></st>
    <div class="container">
      <fl>
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
              :label="e(ns, 'credential')"
            >
            </inp>
          </div>
          <div class="desc">{{e(ns, "setNameDesc")}}</div>
          <template #footer>
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
      </fl>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
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

  import inp from "@/components/InputField/Input.vue";
  import bu from "@/components/InputField/Button.vue";
  import dia from "@/components/Dialogs/Simple/index.vue";
  import fl from "@/components/FullScreenFloating.vue";
  import st from "@/components/SideTab/index.vue";

  import {ns} from "@/interfaces/Online";
  import {say} from "@/utils/i18n";
  import {commEvents} from "../../../../bridge";
  import {link} from "@/utils/ws";
  import {authAvailable, Env, LocalStorage, LocalStorageDef} from "@/utils/ls";
  import {removeSpace} from "@/utils/lang";
  import {RouterName} from "@/router";
  import {omit} from "lodash";
  import {RX} from "../../../../bridge/Receive";

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
      st,
      fl
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
      link.RX(commEvents.userUpdate, this.regHandler);

      if (authAvailable()) {
        const au = Env.get(LocalStorage.__auth);
        link.TX(commEvents.userUpdate, au, {auth: false});
      }
    },
    beforeDestroy() {
      link.Off(commEvents.userUpdate, this.regHandler);
    },
    methods: {
      regHandler(m: RX<commEvents.userUpdate>) {
        if (m.result === "ok") {
          Env.set(LocalStorage.__auth, omit(m, ["result"]) as LocalStorageDef["__auth"]);
          this.$router.push({name: RouterName.nsSelect});
        } else if (m.result === "exist") {
          this.status = stat.userExist;
        } else if (m.result === "rejected") {
          this.status = stat.validateFailed;
        }
      },
      tryReg() {
        this.status = stat.empty;
        if (this.uidInputs === "") {
          link.TX(commEvents.userUpdate, {
            user: this.usernameInputs
          }, {auth: false});
        } else {
          link.TX(commEvents.userUpdate, {
            user: this.usernameInputs,
            credential: removeSpace(this.uidInputs)
          }, {auth: false});
        }
      },
      userNameChange() {
        this.status = stat.empty;
        this.uidInputs = "";
      }
    }
  });
</script>
