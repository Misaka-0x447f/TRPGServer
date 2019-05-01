<template>
  <div class="root">
    <st
      :def="stDef"
      startup="team"
    >
      <template #user>
        <us></us>
      </template>
      <template #team>
        <div class="member-title">
          {{e(ns, "master")}}
        </div>
        <div v-for="v in team.master" class="members">
          {{v}}
        </div>
        <div class="member-title">
          {{e(ns, "player")}}
        </div>
        <div v-for="v in team.player" class="members">
          {{v}}
        </div>
      </template>
    </st>
    <div class="container">
      <fl>
        <dia
          isNetRelated
          :title="e(ns, 'briefingRoom')"
        >
          {{e(ns, "waitingForPlayer")}}
        </dia>
      </fl>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .member-title {
    line-height 1.4em;
    border-bottom underline-0;
    text-align right;
  }

  .members {
    font-size 1.2em;
    line-height: 1.4em;
  }
</style>
<script lang="ts">
  import Vue from "vue";

  import dia from "@/components/Dialogs/Simple/index.vue";
  import st from "@/components/SideTab/index.vue";
  import us from "../UserMenu.vue";
  import fl from "@/components/FullScreenFloating.vue";

  import {ns} from "@/interfaces/Online";
  import {ico} from "@/utils/FontAwesome";
  import {say} from "@/utils/i18n";
  import {link} from "@/utils/ws";
  import {commEvents} from "../../../../../bridge";
  import {In, Out} from "../../../../../bridge/nsUpdateChild";
  import {Env, LocalStorage} from "@/utils/ls";

  export default Vue.extend({
    name: "RoomView",
    components: {
      dia,
      st,
      us,
      fl
    },
    data: () => {
      return {
        e: say,
        ns,
        stDef: [
          {
            id: "user",
            text: "userMenu",
            icon: ico.userTag
          },
          {
            id: "team",
            text: "teamMenu",
            icon: ico.userFriends
          }
        ],
        team: {} as In["child"]
      };
    },
    mounted() {
      const updateTeam = (m: In) => {
        Vue.set(this, "team", m.child);
      };
      link.RX(commEvents.nsUpdateChild, updateTeam);
      link.TX(commEvents.nsUpdateChild, {
        namespace: Env.get(LocalStorage.currNs)
      } as Out);
    }
  });
</script>
