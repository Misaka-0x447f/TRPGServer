<template>
  <div class="root">
    <div class="container">
      <txt :label="e(ns, 'characterName')" v-model="s.name" :placeholder="randName"></txt>
      <txt :label="e(ns, 'characterAge')" v-model="s.age" :placeholder="randAge"></txt>
      <txt :label="e(ns, 'characterDesc')" v-model="s.desc"></txt>
      <div class="hints">
        {{e(ns, "SkipStep2")}}
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .hints {
    color: plain-text-0-hints;
    margin-top: 0.5em;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {say} from "@/utils/i18n";
  import txt from "@/components/InputField/Input.vue";
  import state from "@/utils/state";
  import {ns} from "@/interfaces/Nechronica";
  import {randAge, randName, s} from "@/pages/Editor/Generators/Nechronica/SharedStorage";

  export default Vue.extend({
    name: "NecPage2",
    components: {
      txt
    },
    data: () => {
      return {
        e: say,
        state,
        ns,
        s,
        randName,
        randAge
      };
    }
  });
</script>
