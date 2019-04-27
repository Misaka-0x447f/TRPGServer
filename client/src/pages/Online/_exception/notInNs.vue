<template>
  <div class="root">
    <div class="container">
      <ex
        :title="e(ns, 'notInNsTitle')"
        :action="e('global', 'ok')"
        @ok="exitNamespace"
      >
        {{e(ns, "nsNotJoined")}}
      </ex>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
</style>
<script lang="ts">
  import Vue from "vue";
  import ex from "@/components/Dialogs/ExceptionDialog.vue";
  import {say} from "@/utils/i18n";
  import {exitNamespace} from "@/utils/ns";

  export default Vue.extend({
    name: "room",
    components: {
      ex
    },
    data: () => {
      return {
        e: say,
        ns: "onlineGame",
        exitNamespace
      };
    }
  });
</script>
