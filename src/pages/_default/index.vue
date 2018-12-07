<template>
  <div class="root">
    <div class="container">
      {{e("unknownRoute")}}
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
  import say from "@/utils/i18n";
  import router from "@/router";

  export default Vue.extend({
    name: "index",
    data: () => {
      return {
        e: say
      };
    },
    mounted() {
      router.push("/");
    }
  });
</script>
