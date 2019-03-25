<template>
  <div class="root">
    <div class="container">
      <st
        :def="stDef"
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
      <div class="title">
        {{e("global", "launcherTitle")}}
      </div>
      <tilt class="tiltContainer">
        <menu-button
          :text="e('global', 'characterEditor')"
          routerGoto="/editor"
        >
          <font-awesome-icon icon="users-cog"></font-awesome-icon>
        </menu-button>
        <vs></vs>
        <menu-button
          :text="e('global', 'viewOnlineGames')"
          routerGoto="/online"
        >
          <font-awesome-icon icon="globe"></font-awesome-icon>
        </menu-button>
      </tilt>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    width 100%
    height 100%
    overflow: hidden
  }

  .title {
    margin: 1em 0;
  }

  .tiltContainer {
    display flex
    align-items center
    justify-content center
    width 100%
    height 100%
  }

  .about-panel {
    padding: 1.5em 0;
  }

  .big {
    font-size 1.5em
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {say} from "@/utils/i18n";

  import tilt from "./TiltBox.vue";
  import menuButton from "./MenuButton.vue";
  import vs from "./VerticalSplitter.vue";
  import wp from "@/components/Wallpaper.vue";
  import st from "@/components/SideTab/index.vue";

  import {ico} from "@/utils/FontAwesome";
  import {timeout} from "@/utils/lang";

  export default Vue.extend({
    name: "MainMenu",
    components: {
      tilt,
      menuButton,
      vs,
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
    },
    async beforeRouteLeave(_0, _1, next) {
      await timeout(1000);
      next();
    }
  });
</script>
