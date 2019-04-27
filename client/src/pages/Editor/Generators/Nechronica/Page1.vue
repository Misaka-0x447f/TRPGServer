<template>
  <div class="root">
    <div class="container">
      <div class="hint">
        {{e(ns, "desc")}}
      </div>
      <linkText :newTab="true" href="https://sites.google.com/site/nechronicaintaiwan/">
        https://sites.google.com/site/nechronicaintaiwan/
      </linkText>
      <div class="hint">
        {{e(ns, "desc2")}}
      </div>
      <div class="module">
        <txt :label="e(ns, 'characterName')" v-model="s.name" :placeholder="randName"></txt>
        <txt :label="e(ns, 'characterAge')" v-model="s.age" :placeholder="randAge"></txt>
        <txt :label="e(ns, 'characterDesc')" v-model="s.desc"></txt>
      </div>
      <div class="hint">
        {{e(ns, "SkipStep2")}}
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .hint {
    color: plain-text-0-hints;
  }
  
  .module {
    margin: 0.5em 0;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {say} from "@/utils/i18n";
  import linkText from "@/components/linkText.vue";
  import {ns} from "@/interfaces/Nechronica";
  import txt from "@/components/InputField/Input.vue";
  import state from "@/utils/state";
  import {randAge, randName, s} from "@/pages/Editor/Generators/Nechronica/SharedStorage";

  export default Vue.extend({
    name: "NecPage1",
    components: {
      linkText,
      txt
    },
    data: () => {
      return {
        e: say,
        ns,
        state,
        s,
        randName,
        randAge
      };
    }
  });
</script>
