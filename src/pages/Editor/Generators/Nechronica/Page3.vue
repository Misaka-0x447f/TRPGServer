<template>
  <div class="root">
    <div class="container">
      <ch :title="e('nechronica', 'arch')" :items="e('nechronica', 'builtInArch')" :callback="selectCallback"></ch>
      <div class="hint">
        {{e("nechronica", "archDesc")}}
      </div>
      <div class="hint">
        {{e("nechronica", "preferBuiltInArch")}}
      </div>
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
  import ch from "@/pages/_public/InputField/SelectItem.vue";
  import {say} from "@/utils/i18n";

  export default Vue.extend({
    name: "NecPage3ArchSelect",
    components: {
      ch
    },
    data: () => {
      return {
        e: say
      };
    },
    methods: {
      selectCallback(e: string) {
        console.log(e);
      }
    }
  });
</script>
