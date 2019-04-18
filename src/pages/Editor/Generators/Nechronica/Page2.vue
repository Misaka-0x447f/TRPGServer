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
      <txt :label="e(ns, 'customRemains')" @input="customRemainsInput"
           v-model="customRemains.title"></txt>
      <txt :label="e(ns, 'customRemainsDesc')" @input="customRemainsInput"
           v-model="customRemains.desc"></txt>
      <div class="break"></div>
      <txt :label="e(ns, 'cache') + '#01'" v-model="cache[0]"></txt>
      <txt :label="e(ns, 'cache') + '#02'" v-model="cache[1]"></txt>
      <div class="hint">
        {{e(ns, "cacheDesc")}}
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
    margin: 0.5em 0;
  }

  .break {
    height: min(3vh, 2em);
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import ch from "@/components/InputField/SelectItem.vue";
  import {say} from "@/utils/i18n";
  import {getPropertyById} from "@/utils/PropertyEditor";
  import txt from "@/components/InputField/Input.vue";
  import {cloneDeep} from "lodash";
  import {idEnums, ns} from "@/interfaces/Nechronica";
  import {s} from "@/pages/Editor/Generators/Nechronica/SharedStorage";
  import linkText from "@/components/linkText.vue";
  import {Choices} from "@/components/InputField/SelectItem";

  export default Vue.extend({
    name: "NecPage2",
    components: {
      ch,
      txt,
      linkText,
    },
    data: () => {
      return {
        e: say,
        customRemains: {
          title: "",
          desc: ""
        },
        cache: ["", ""],
        idEnums,
        getPropertyById,
        ns,
        s
      };
    },
    watch: {
      cache() {
        s.cache = cloneDeep(this.cache);
      }
    },
    methods: {
      pageChanged(e: Choices) {
        this.customRemains.title = e.title;
        this.customRemains.desc = e.desc;
        s.remains = e.label;
      },
      customRemainsInput() {
        s.remains = cloneDeep(this.customRemains);
      }
    }
  });
</script>
