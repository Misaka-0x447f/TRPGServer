<template>
  <div class="root">
    <st
      :def="stDef"
    >
      <template #user>
        <us></us>
      </template>
    </st>
    <div class="container" @keypress.enter="query">
      <fl>
        <dia
          isNetRelated
          :title="e(ns, 'namespaceSelect')"
        >
          <div>
            <div>
              {{e(ns, "namespaceSelectPublicNotSupported")}}
            </div>
            <inp
              :label="e(ns, 'namespaceName')"
              @input="stateReset"
              v-model="namespace"
            ></inp>
          </div>
          <div class="margin" v-if="Env.exist(LocalStorage.currNs)">
            <div>
              {{e(ns, "namespaceRejoinDesc")}}
            </div>
            <div class="split">
              <div class="big">
                {{Env.get(LocalStorage.currNs)}}
              </div>
              <bu inline :throttle="5000" @click="joinNs">
                {{e(ns, "namespaceJoin")}}
              </bu>
            </div>
          </div>
          <template #footer>
            <div class="foot">
              <div class="tips">
                <div v-if="state === stat.join">
                  {{e(ns, "namespaceExist")}}
                </div>
                <div v-if="state === stat.create">
                  {{e(ns, "namespaceNotExist")}}
                </div>
                <div v-if="state === stat.full">
                  {{e(ns, "namespaceFull")}}
                </div>
                <div v-if="state === stat.empty">
                  {{e(ns, "namespaceNameEmpty")}}
                </div>
              </div>
              <bu :throttle="5000" @click="query">
                <span v-if="state === stat.join">
                  {{e(ns, "namespaceJoin")}}
                </span>
                <span v-else-if="state === stat.create">
                  {{e(ns, "namespaceCreate")}}
                </span>
                <span v-else>
                  {{e(ns, "namespaceList")}}
                </span>
              </bu>
            </div>
          </template>
        </dia>
      </fl>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .foot {
    width 100%;
    display: flex;
    align-items center;
    justify-content space-between;
  }
  
  .split {
    display: flex;
    align-content: center;
    justify-content: space-between;
  }
  
  .margin {
    margin-top: 1em;
  }
    
  .big {
    font-size: 1.2em;
  }
</style>
<script lang="ts">
  import Vue from "vue";

  import dia from "@/components/Dialogs/Simple/index.vue";
  import bu from "@/components/InputField/Button.vue";
  import inp from "@/components/InputField/Input.vue";
  import fl from "@/components/FullScreenFloating.vue";
  import st from "@/components/SideTab/index.vue";
  import us from "../UserMenu.vue";

  import {say} from "@/utils/i18n";
  import {ns} from "@/interfaces/Online";
  import {link} from "@/utils/ws";
  import {commEvents} from "../../../../../bridge";
  import {RouterName} from "@/router";
  import {ico} from "@/utils/FontAwesome";

  import {Env, LocalStorage} from "@/utils/ls";
  import {RX} from "../../../../../bridge/Receive";

  enum stat {
    search = "search",
    create = "create",
    join = "join",
    full = "full",
    empty = "empty"
  }
  
  export default Vue.extend({
    name: "Room",
    components: {
      dia,
      bu,
      inp,
      st,
      us,
      fl
    },
    data() {
      return {
        e: say,
        ns,
        state: stat.search,
        stat,
        namespace: "",
        Env,
        LocalStorage,
        stDef: [
          {
            id: "user",
            text: "userMenu",
            icon: ico.userTag
          }
        ]
      };
    },
    mounted() {
      link.RX(commEvents.nsGet, this.queryHandler);
      link.RX(commEvents.nsJoin, this.joinHandler);
    },
    beforeDestroy() {
      link.Off(commEvents.nsGet, this.queryHandler);
      link.Off(commEvents.nsJoin, this.joinHandler);
    },
    methods: {
      joinHandler(m: RX<commEvents.nsJoin>) {
        if (m.result === "ok") {
          Env.set(LocalStorage.currNs, this.namespace);
          this.$router.push({name: RouterName.roomView});
        } else if (m.result === "full") {
          this.state = stat.full;
        } else {
          throw new Error("Unexpected state.");
        }
      },
      queryHandler(m: RX<commEvents.nsGet>) {
        if (m.result === "ok") {
          this.state = stat.join;
        } else if (m.result === "null") {
          this.state = stat.create;
        } else {
          throw new Error("Unexpected state.");
        }
      },
      query() {
        if (this.namespace.length === 0) {
          this.state = stat.empty;
          return;
        }
        if (this.isState(stat.search, stat.full)) {
          link.TX(commEvents.nsGet, {
            namespace: this.namespace
          });
        } else if (this.isState(stat.create, stat.join)) {
          link.TX(commEvents.nsJoin, {
            namespace: this.namespace
          });
        } else {
          throw new Error("Unexpected mode.");
        }
      },
      stateReset() {
        this.state = stat.search;
      },
      isState(...s: stat[]) {
        return s.includes(this.state);
      },
      joinNs() {
        this.$router.push({name: RouterName.roomView});
      }
    }
  });
</script>
