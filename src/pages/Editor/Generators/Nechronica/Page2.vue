<template>
  <div class="root">
    <div class="container">
      {{e("nechronicaDataGenGetCharacterName")}}
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {

  }
</style>
<script lang="ts">
  import Vue from "vue";
  import say from "@/utils/i18n";
  import {getRandomHash} from "@/utils/math";

  export default Vue.extend({
    name: "Page2",
    data: () => {
      return {
        e: say
      };
    },
    mounted() {
      console.log(getRandomHash());
    }
  });
</script>
