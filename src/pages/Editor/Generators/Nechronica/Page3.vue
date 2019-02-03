<template>
  <div class="root">
    <div class="container">
      <ch @page="pageChanged" :title="e('nechronica', 'arch')" :items="e('nechronica', 'builtInArch')"></ch>
      <div class="hint">
        {{e("nechronica", "archDesc")}}
      </div>
      <div class="hint">
        {{e("nechronica", "preferBuiltInArch")}}
      </div>
      <txt :label="e('nechronica', 'customArch')" :callback="customArchInput" v-model="customArch.title"></txt>
      <txt :label="e('nechronica', 'customArchDesc')" :callback="customArchInput" v-model="customArch.desc"></txt>
      <div class="break"></div>
      <txt :label="e('nechronica', 'cache') + '#01'" :callback="cacheUpdate" v-model="customCache[0]"></txt>
      <txt :label="e('nechronica', 'cache') + '#02'" :callback="cacheUpdate" v-model="customCache[1]"></txt>
      <div class="hint">
        {{e("nechronica", "cacheDesc")}}
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .hint {
    color: plain-text-0-hints;
    margin: 0.5em 0;
  }
  
  .break {
    height: min(3vh, 2em);
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import ch, {Choices} from "@/pages/_public/InputField/SelectItem.vue";
  import {say} from "@/utils/i18n";
  import {updateProperty} from "@/utils/PropertyEditor";
  import txt from "@/pages/_public/InputField/Input.vue";
  import {defaultTo} from "lodash";

  export default Vue.extend({
    name: "NecPage3ArchSelect",
    components: {
      ch,
      txt
    },
    data: () => {
      return {
        e: say,
        customArch: {
          title: "",
          desc: ""
        },
        customCache: [
          null,
          null
        ]
      };
    },
    methods: {
      pageChanged(e: Choices) {
        updateProperty("arch", JSON.stringify(e));
        this.customArch.title = e.title;
        this.customArch.desc = defaultTo(e.desc, "");
      },
      customArchInput() {
        updateProperty("arch", JSON.stringify(this.customArch));
      },
      cacheUpdate() {
        updateProperty("cache", JSON.stringify(this.customCache));
      }
    }
  });
</script>
