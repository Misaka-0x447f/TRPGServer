<template>
  <div class="root">
    <div class="container">
      <div class="desc hint">
        {{e(ns, "desc")}}
      </div>
      <linkText :newTab="true" href="https://sites.google.com/site/nechronicaintaiwan/">
        https://sites.google.com/site/nechronicaintaiwan/
      </linkText>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .hint {
    color: plain-text-0-hints;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {say} from "@/utils/i18n";
  import linkText from "@/components/linkText.vue";
  import {ns} from "@/interfaces/Nechronica";

  export default Vue.extend({
    name: "NecPage1",
    components: {
      linkText
    },
    data: () => {
      return {
        e: say,
        ns
      };
    }
  });
</script>
