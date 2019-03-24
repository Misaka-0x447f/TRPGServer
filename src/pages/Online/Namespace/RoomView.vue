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
      <dia
        isNetRelated
        :title="e(ns, 'briefingRoom')"
      >
        
      </dia>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {

  }
</style>
<script lang="ts">
  import Vue from "vue";
  import dia from "@/components/Dialogs/Simple/index.vue";
  import {ns} from "@/interfaces/Online";
  import st from "@/components/SideTab/index.vue";
  import {ico} from "@/utils/FontAwesome";
  import us from "../UserMenu.vue";

  export default Vue.extend({
    name: "RoomView",
    components: {
      dia,
      st,
      us
    },
    data: () => {
      return {
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
