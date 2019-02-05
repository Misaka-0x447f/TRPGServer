<template>
  <div class="root">
    <div class="container">
      <names>
        {{e(ns, "equips")}}
      </names>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {

  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {say} from "@/utils/i18n";
  import {ns} from "@/interfaces/Nechronica";
  import names from "../propTitle.vue";

  export default Vue.extend({
    name: "Page5",
    components: {
      names
    },
    data: () => {
      return {
        e: say,
        ns
      };
    }
  });
</script>
