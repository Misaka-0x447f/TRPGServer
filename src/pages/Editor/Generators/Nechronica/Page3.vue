<template>
  <div class="root">
    <div class="container">
      <ch
        @page="pageChanged"
        :title="e(ns, 'remains')"
        :items="e(ns, 'builtInRemains')"
      ></ch>
      <div class="hint">
        {{e(ns, "remainsDesc")}}
      </div>
      <div class="hint">
        {{e(ns, "preferBuiltInRemains")}}
      </div>
      <txt :label="e(ns, 'customRemains')" :callback="customRemainsInput"
           v-model="customRemains.title"></txt>
      <txt :label="e(ns, 'customRemainsDesc')" :callback="customRemainsInput"
           v-model="customRemains.desc"></txt>
      <div class="break"></div>
      <txt :label="e(ns, 'cache') + '#01'" :callback="cacheUpdate" v-model="customCache[0]"></txt>
      <txt :label="e(ns, 'cache') + '#02'" :callback="cacheUpdate" v-model="customCache[1]"></txt>
      <div class="hint">
        {{e(ns, "cacheDesc")}}
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
  import {idEnums, ns} from "@/interfaces/Nechronica";
  
  export default Vue.extend({
    name: "NecPage3ArchSelect",
    components: {
      ch,
      txt
    },
    data: () => {
      return {
        e: say,
        customRemains: {
          title: "",
          desc: ""
        },
        customCache: [
          "",
          ""
        ],
        idEnums,
        getPropertyById,
        ns
      };
    },
    methods: {
      pageChanged(e: Choices) {
        updateProperty(idEnums.remains, e.label);
        this.customRemains.title = e.title;
        this.customRemains.desc = defaultTo(e.desc, "");
      },
      customRemainsInput() {
        updateProperty(idEnums.remains, this.customRemains);
      },
      cacheUpdate() {
        updateProperty("cache", this.customCache);
      }
    }
  });
</script>
