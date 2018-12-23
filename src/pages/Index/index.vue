<template>
  <div class="root">
    <div class="container">
      <wp></wp>
      <span class="big">
        {{e("dashboard")}}
      </span>
      <span>
        {{e("of")}}
      </span>
      <span class="big">
        {{e("projectName")}}
      </span>
      <tilt class="tiltContainer">
        <menu-button
          :text="e('characterEditor')"
          routerGoto="/editor"
        >
          <font-awesome-icon icon="users-cog"></font-awesome-icon>
        </menu-button>
        <vs></vs>
        <menu-button
          :text="e('viewOnlineGames')"
          routerGoto="/lobby"
        >
          <font-awesome-icon icon="globe"></font-awesome-icon>
        </menu-button>
      </tilt>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    width 100vw
    height 100vh
    overflow: hidden
  }

  .tiltContainer {
    display flex
    align-items center
    justify-content center
    width 100%
    height 100%
  }

  .big {
    font-size 1.5em
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import say from "@/utils/i18n";
  import Tilt from "./TiltBox.vue";
  import MenuButton from "./MenuButton.vue";
  import Splitter from "./VerticalSplitter.vue";
  import {timeout} from "@/utils/System";
  import WallPaper from "@/pages/_public/Wallpaper.vue";
  import {sideTab} from "@/main";
  import {ico} from "@/utils/FontAwesome";
  import {MenuStyle} from "@/utils/SideTabHandler";

  export default Vue.extend({
    name: "MainMenu",
    components: {
      tilt: Tilt,
      menuButton: MenuButton,
      vs: Splitter,
      wp: WallPaper
    },
    data: () => {
      return {
        e: say
      };
    },
    mounted() {
      // noinspection JSUnusedGlobalSymbols
      sideTab.updateTab({
        templateMenu: {
          icon: ico.userCogs,
          children: {
            currentTemplate: {
              style: MenuStyle.text,
              handler: () => {
                return `${say("currentTemplate")}${say("nechronica")}`;
              }
            },
            changeTemplate: {
              style: MenuStyle.click,
              handler: () => {
                console.log("clickHandler");
              }
            }
          }
        },
        aboutMenu: {
          icon: ico.infoCircle,
          children: {
            version: {
              style: MenuStyle.text
            },
            about: {
              style: MenuStyle.textarea
            }
          }
        }
      });
    },
    destroyed() {
      sideTab.destroyTab(["templateMenu"]);
    },
    async beforeRouteLeave(_0, _1, next) {
      await timeout(1000);
      next();
    }
  });
</script>
