<template>
  <div class="root">
    <st
      :def="stDef"
      startup="_switch_to"
    >
      <template #about>
        <div class="about-panel">
          <div>
            {{e(ns, "version")}}
          </div>
          <div>
            {{e(ns, "about")}}
          </div>
          <div>
            {{e(ns, "aboutFollowUs")}}
          </div>
        </div>
      </template>
    </st>
    <wp></wp>
    <div class="container">
      <div>
        <div class="content">
          {{e("global", "launcherTitle")}}
        </div>
        <div class="content">
          {{e("global", "guide")}}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    width 100%
    height 100%
    display flex
    align-items center
    justify-content center
  }
  
  .content {
    font-size 3em
    line-height 2em
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {say} from "@/utils/i18n";
  import wp from "@/components/Wallpaper.vue";
  import st from "@/components/SideTab/index.vue";

  import {ico} from "@/utils/FontAwesome";

  export default Vue.extend({
    name: "MainMenu",
    components: {
      wp,
      st
    },
    data: () => {
      return {
        e: say,
        ns: "global",
        stDef: [
          {
            id: "about",
            text: "aboutMenu",
            icon: ico.infoCircle
          }
        ]
      };
    }
  });
</script>
