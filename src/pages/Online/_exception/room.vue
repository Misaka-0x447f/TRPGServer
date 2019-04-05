<template>
  <div class="root">
    <div class="container">
      <ex
        :title="e(ns, 'notInNsTitle')"
        :action="e(ns, 'ok')"
        @ok="exit"
      >
        {{e(ns, "notInNs")}}
      </ex>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
</style>
<script lang="ts">
  import Vue from "vue";
  import ex from "@/components/Dialogs/ExceptionDialog.vue";
  import router, {RouterName} from "@/router";
  import {say} from "@/utils/i18n";
  import state from "@/utils/state";

  export default Vue.extend({
    name: "room",
    components: {
      ex
    },
    data: () => {
      return {
        e: say,
        ns: "onlineGame"
      };
    },
    methods: {
      exit() {
        state.online.namespace.name = undefined;
        router.push({name: RouterName.nsSelect});
      }
    }
  });
</script>
