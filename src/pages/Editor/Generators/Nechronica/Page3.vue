<template>
  <div class="root">
    <div class="container">
      <ch
        @page="pageChanged"
        :title="e('nechronica', 'redundancyData')"
        :items="e('nechronica', 'builtInRedundancyData')"
      ></ch>
      <div class="hint">
        {{e("nechronica", "redundancyDataDesc")}}
      </div>
      <div class="hint">
        {{e("nechronica", "preferBuiltInData")}}
      </div>
      <txt :label="e('nechronica', 'customRedundancyData')" :callback="customArchInput"
           v-model="customArch.title"></txt>
      <txt :label="e('nechronica', 'customRedundancyDataDesc')" :callback="customArchInput"
           v-model="customArch.desc"></txt>
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
  import {getPropertyById, updateProperty} from "@/utils/PropertyEditor";
  import txt from "@/pages/_public/InputField/Input.vue";
  import {defaultTo} from "lodash";
  import {idEnums} from "@/interfaces/Nechronica";

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
        ],
        idEnums,
        findPropertyById: getPropertyById
      };
    },
    methods: {
      pageChanged(e: Choices) {
        updateProperty("redundancyData", e.label);
        this.customArch.title = e.title;
        this.customArch.desc = defaultTo(e.desc, "");
      },
      customArchInput() {
        updateProperty("redundancyData", this.customArch);
      },
      cacheUpdate() {
        updateProperty("cache", this.customCache);
      }
    }
  });
</script>
