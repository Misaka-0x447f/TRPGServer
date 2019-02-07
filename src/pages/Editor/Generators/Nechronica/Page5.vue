<template>
  <div class="root">
    <div class="container">
      <div class="hint">
        {{e(ns, "lastStep")}}
      </div>
      <div class="hint">
        {{e(ns, "wizardDone")}}
      </div>
      <div class="hint">
        {{e(ns, "finishTip")}}
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .hint {
    color: plain-text-0-hints;
    margin: 0.5em 0;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {say} from "@/utils/i18n";
  import {ns} from "@/interfaces/Nechronica";

  export default Vue.extend({
    name: "Page5",
    data: () => {
      return {
        e: say,
        ns
      };
    }
  });
</script>
