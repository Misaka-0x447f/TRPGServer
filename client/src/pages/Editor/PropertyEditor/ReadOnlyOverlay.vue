<template>
  <div class="root">
    <div class="container">
      <div class="readOnlyOverlayContainer" v-if="this.ro">
        <div class="readOnlyOverlay"></div>
        <div class="readOnlyTips">
          {{e("propertyEditor", "isReadOnly")}}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .readOnlyOverlayContainer {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .readOnlyOverlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 1;
  }

  .readOnlyTips {
    position: absolute;
    border-radius: 0.5em;
    right: 0.5em;
    background: container-background-2;
    padding: 0.5em 1em;
    color: plain-text-1;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {say} from "@/utils/i18n";

  export default Vue.extend({
    name: "ReadOnlyOverlay",
    props: {
      ro: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        e: say
      };
    }
  });
</script>
