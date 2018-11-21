<template>
  <div class="root">
    <div class="container">
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
        <dbm :text="e('characterEditor')">
          <font-awesome-icon icon="users-cog"></font-awesome-icon>
        </dbm>
        <vs></vs>
        <dbm :text="e('viewOnlineGames')">
          <font-awesome-icon icon="globe"></font-awesome-icon>
        </dbm>
      </tilt>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container
    background url("./../../assets/wallpaper.jpg")
    width 100vw
    height 100vh
    overflow hidden
    
  .tiltContainer
    display flex
    align-items center
    justify-content center
    width 100%
    height 100%
    
  .big
    font-size 1.5em
</style>
<script lang="ts">
  import Vue from "vue";
  import say from "@/utils/i18n";
  import Tilt from "./TiltBox.vue";
  import Dbm from "./DualMenuButton.vue";
  import Splitter from "./VerticalSplitter.vue";

  export default Vue.extend({
    name: "MainMenu",
    components: {
      tilt: Tilt,
      dbm: Dbm,
      vs: Splitter
    },
    data: () => {
      return {
        e: say
      };
    }
  });

</script>
