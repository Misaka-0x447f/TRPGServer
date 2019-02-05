<template>
  <div class="root">
    <div class="container">
      <ch
        @page="primaryFirmware"
        :title="e(ns, 'primaryFirmware')"
        :items="firmArray"
      ></ch>
      <ch
        @page="secondaryFirmware"
        :title="e(ns, 'secondaryFirmware')"
        :items="firmArray"
      ></ch>
      <div class="hint">
        {{e(ns, "firmwareDesc")}}
      </div>
      <ch
        @page="individuality"
        :title="e(ns, 'individuality')"
        :items="indArray"
      ></ch>
      <div class="hint">
        {{e(ns, "individualityDesc")}}
      </div>
      <bonus
        :InheritedDef="bonusDef"
        :callback="bonusCallback"
        :title="e(ns, 'enhance')"
        :minSlots="5"
      ></bonus>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .hint {
    color: plain-text-0-hints;
    margin: 0.5em 0 0.8em 0;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import ch, {Choices} from "@/components/InputField/SelectItem.vue";
  import {say} from "@/utils/i18n";
  import {getPropertyById, updateProperty} from "@/utils/PropertyEditor";
  import bonus, {PointDef} from "@/components/InputField/BonusPoint.vue";
  import {enhance, FreeEnhanceDecideDef, getInheritedEP, idEnums, ns} from "@/interfaces/Nechronica";
  import {Shared, sharedUpdated} from "@/pages/Editor/Generators/Nechronica/Page4SharedStorage";

  export default Vue.extend({
    name: "Page4",
    components: {
      ch,
      bonus
    },
    data: () => {
      return {
        e: say,
        bonusDef: {
          initialPoint: [],
          freePoint: {
            totalFree: 1
          }
        } as PointDef,
        ns,
        idEnums,
        firm1: "Stacy",
        firm2: "Stacy",
        findPropertyById: getPropertyById
      };
    },
    async mounted() {
      this.setBonusDef();
    },
    computed: {
      firmArray() {
        return say(ns, "builtInFirmware");
      },
      indArray() {
        return say(ns, "builtInIndividuality");
      }
    },
    methods: {
      primaryFirmware(e: Choices) {
        updateProperty("primaryFirmware", e.label);
        this.firm1 = e.label;
        this.setBonusDef();
        this.$set(Shared, "firm1", e.label);
        sharedUpdated();
      },
      secondaryFirmware(e: Choices) {
        updateProperty("secondaryFirmware", e.label);
        this.firm2 = e.label;
        this.setBonusDef();
        this.$set(Shared, "firm2", e.label);
        sharedUpdated();
      },
      individuality(e: Choices) {
        updateProperty("individuality", e.label);
      },
      bonusCallback(e: { common: FreeEnhanceDecideDef[] }) {
        updateProperty("enhance", e.common);
        this.$set(Shared, "bonus", e.common);
        sharedUpdated();
      },
      setBonusDef() {
        this.bonusDef.initialPoint = [
          {
            label: "arms",
            text: say(ns, "arms"),
            inherited: this.getInheritedEP(enhance.arms)
          },
          {
            label: "evolve",
            text: say(ns, "evolve"),
            inherited: this.getInheritedEP(enhance.evolve)
          },
          {
            label: "modify",
            text: say(ns, "modify"),
            inherited: this.getInheritedEP(enhance.modify)
          }
        ];
      },
      getInheritedEP(which: enhance) {
        return getInheritedEP(which, this.firm1, this.firm2);
      }
    }
  });
</script>
