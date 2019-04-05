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
          {{e(ns, "namespaceSelectPublicNotSupported")}}
          <inp
            :label="e(ns, 'namespaceName')"
            @input="stateReset"
            v-model="namespace"
          ></inp>
          <template #footer>
            <div class="foot">
              <div class="tips">
                <div v-if="isState('join')">
                  {{e(ns, "namespaceExist")}}
                </div>
                <div v-if="isState('create')">
                  {{e(ns, "namespaceNotExist")}}
                </div>
                <div v-if="isState('full')">
                  {{e(ns, "namespaceFull")}}
                </div>
                <div v-if="isState('empty')">
                  {{e(ns, "namespaceNameEmpty")}}
                </div>
              </div>
              <bu :throttle="5000" @click="query">
                <span v-if="isState('join')">
                  {{e(ns, "namespaceJoin")}}
                </span>
                <span v-else-if="isState('create')">
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
  import {events} from "../../../../serverInterfaces";
  import {RouterName} from "@/router";
  import {ico} from "@/utils/FontAwesome";
  
  import * as ls from "../../../../serverInterfaces/namespaceQuery";
  import * as cd from "../../../../serverInterfaces/namespaceCreate";

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
        state: "search" as "search" | "create" | "join" | "full" | "empty",
        namespace: "",
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
      const queryHandler = (m: ls.In) => {
        if (m.result === ls.response.ok) {
          this.state = "join";
        } else if (m.result === ls.response.null) {
          this.state = "create";
        } else {
          throw new Error("Unexpected state.");
        }
      };
      link.RX(events.namespaceQuery, queryHandler);
      const joinHandler = (m: cd.In) => {
        if (m.result === cd.response.ok) {
          // TODO: no more room id in router, take another name
          this.$router.push({name: RouterName.roomView, params: {ns: this.namespace}});
        } else if (m.result === cd.response.full) {
          this.state = "full";
        } else {
          throw new Error("Unexpected state.");
        }
      };
      link.RX(events.namespaceCreate, joinHandler);
    },
    methods: {
      query() {
        if (this.namespace.length === 0) {
          this.state = "empty";
          return;
        }
        if (["search", "full"].includes(this.state)) {
          link.TX(events.namespaceQuery, {
            namespace: this.namespace
          } as ls.Out);
        } else if (["create", "join"].includes(this.state)) {
          link.TX(events.namespaceCreate, {
            namespace: this.namespace
          } as cd.Out);
        } else {
          throw new Error("Unexpected mode.");
        }
      },
      stateReset() {
        this.state = "search";
      },
      isState(s: string) {
        return s === this.state;
      }
    }
  });
</script>
