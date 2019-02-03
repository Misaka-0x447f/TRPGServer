<template>
  <div class="root">
    <div class="container">
      <ch
        @page="primaryPage"
        :title="e('nechronica', 'primaryFirmware')"
        :items="e('nechronica', 'builtInFirmware')"
        :default="random(0, maxFirmware)"
      ></ch>
      <ch
        @page="secondaryPage"
        :title="e('nechronica', 'secondaryFirmware')"
        :items="e('nechronica', 'builtInFirmware')"
        :default="random(0, maxFirmware)"
      ></ch>
      <div class="hint">
        {{e("nechronica", "firmwareDesc")}}
      </div>
      <ch
        @page="individuality"
        :title="e('nechronica', 'individuality')"
        :items="e('nechronica', 'builtInIndividuality')"
        :default="random(0, maxIndividuality)"
      ></ch>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .hint {
    color: plain-text-0-hints;
    margin: 0.5em 0;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import ch, {Choices} from "@/pages/_public/InputField/SelectItem.vue";
  import {say} from "@/utils/i18n";
  import {updateProperty} from "@/utils/PropertyEditor";
  import {random} from "lodash";

  export default Vue.extend({
    name: "Page4",
    components: {
      ch
    },
    data: () => {
      return {
        e: say,
        random
      };
    },
    computed: {
      maxFirmware(): number {
        return this.e("nechronica", "primaryFirmware").length - 1;
      },
      maxIndividuality(): number {
        return this.e("nechronica", "builtInIndividuality").length - 1;
      }
    },
    methods: {
      primaryPage(e: Choices) {
        updateProperty("primaryFirmware", e.label);
      },
      secondaryPage(e: Choices) {
        updateProperty("secondaryFirmware", e.label);
      },
      individuality(e: Choices) {
        updateProperty("individuality", e.label);
      }
    }
  });
</script>
