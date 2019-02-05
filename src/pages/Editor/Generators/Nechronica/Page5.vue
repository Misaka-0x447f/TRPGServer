<template>
  <div class="root">
    <div class="container">

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
