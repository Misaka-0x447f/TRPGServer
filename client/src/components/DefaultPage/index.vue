<template>
  <div class="root">
    <div class="container">
      {{e("global", "unknownRoute")}}
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    width: 100%;
    height: 100%;
    background: container-background-0;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {say} from "@/utils/i18n";
  import router, {RouterName} from "../../router";

  export default Vue.extend({
    name: "auth.vue",
    data: () => {
      return {
        e: say
      };
    },
    mounted() {
      // noinspection TypeScriptUnresolvedFunction
      router.push({name: RouterName.startup});
    }
  });
</script>
