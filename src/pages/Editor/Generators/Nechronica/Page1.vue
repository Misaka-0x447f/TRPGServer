<template>
  <div class="root">
    <div class="container">
      <div class="desc">
        {{e("nechronica", "desc")}}
      </div>
      <linkText :newTab="true" href="https://sites.google.com/site/nechronicaintaiwan/">
        https://sites.google.com/site/nechronicaintaiwan/
      </linkText>
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
  import linkText from "@/pages/_public/linkText.vue";

  export default Vue.extend({
    name: "NecPage1",
    components: {
      linkText
    },
    data: () => {
      return {
        e: say
      };
    }
  });
</script>
