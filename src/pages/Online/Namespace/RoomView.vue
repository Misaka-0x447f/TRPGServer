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
        
      </template>
    </st>
    <div class="container">
      <fl>
        <dia
          isNetRelated
          :title="e(ns, 'briefingRoom')"
        >
          
        </dia>
      </fl>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
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
        ]
      };
    }
  });
</script>
