<template>
  <div class="root">
    <div class="container">
      <div class="inner-container" @keypress.enter="event">
        <dia
          isNetRelated
          :title="e(ns, 'namespaceSelect')"
        >
          {{e(ns, "namespaceSelectPublicNotSupported")}}
          <inp
            :label="e(ns, 'namespaceName')"
            @input="stateReset"
          ></inp>
          <template slot="footer">
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
              </div>
              <bu :throttle="5000" @click="event" v-model="namespace">
                <span v-if="isState('join')">
                  {{e(ns, "namespaceJoin")}}
                </span>
                <span v-if="isState('create')">
                  {{e(ns, "namespaceCreate")}}
                </span>
                <span v-if="isState('search') || isState('full')">
                  {{e(ns, "namespaceList")}}
                </span>
              </bu>
            </div>
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
    align-items center;
    justify-content: center;
  }
  
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
  import {say} from "@/utils/i18n";
  import {ns} from "@/interfaces/Online";
  import bu from "@/components/InputField/Button.vue";
  import inp from "@/components/InputField/Input.vue";
  import {link} from "@/utils/ws";
  import {events} from "../../../../serverInterfaces";
  import * as ls from "../../../../serverInterfaces/namespaceQuery";
  import * as cd from "../../../../serverInterfaces/namespaceCreate";
  import {RouterName} from "@/router";

  export default Vue.extend({
    name: "Room",
    components: {
      dia,
      bu,
      inp
    },
    data: () => {
      return {
        e: say,
        ns,
        state: "search" as "search" | "create" | "join" | "full",
        namespace: ""
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
          this.$router.push({name: RouterName.room, params: {uid: m.uid as string}});
        } else if (m.result === cd.response.full) {
          this.state = "full";
        } else {
          throw new Error("Unexpected state.");
        }
      };
      link.RX(events.namespaceCreate, joinHandler);
    },
    methods: {
      event() {
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
