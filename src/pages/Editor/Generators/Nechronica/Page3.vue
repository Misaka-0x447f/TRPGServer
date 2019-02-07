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
  import {getPropertyById} from "@/utils/PropertyEditor";
  import bonus, {PointDef} from "@/components/InputField/BonusPoint.vue";
  import {enhance, FreeEnhanceDecideDef, getInheritedEP, idEnums, ns} from "@/interfaces/Nechronica";
  import {s, storageProxy} from "@/pages/Editor/Generators/Nechronica/SharedStorage";

  export default Vue.extend({
    name: "Page3",
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
        findPropertyById: getPropertyById
      };
    },
    computed: {
      firmArray() {
        return say(ns, "builtInFirmware");
      },
      indArray() {
        return say(ns, "builtInIndividuality");
      }
    },
    mounted() {
      storageProxy.registerTrigger(() => {
        this.updateBonusDef();
      });
      this.updateBonusDef();
    },
    methods: {
      primaryFirmware(e: Choices) {
        this.$set(s, idEnums.Firm1, e.label);
      },
      secondaryFirmware(e: Choices) {
        this.$set(s, idEnums.Firm2, e.label);
      },
      individuality(e: Choices) {
        this.$set(s, idEnums.ind, e.label);
      },
      bonusCallback(e: { common: FreeEnhanceDecideDef[] }) {
        this.$set(s, idEnums.enhance, e.common);
      },
      updateBonusDef() {
        this.bonusDef.initialPoint = [
          {
            label: "arms",
            text: say(ns, "arms"),
            inherited: getInheritedEP(enhance.arms, s.primaryFirmware, s.secondaryFirmware)
          },
          {
            label: "evolve",
            text: say(ns, "evolve"),
            inherited: getInheritedEP(enhance.evolve, s.primaryFirmware, s.secondaryFirmware)
          },
          {
            label: "modify",
            text: say(ns, "modify"),
            inherited: getInheritedEP(enhance.modify, s.primaryFirmware, s.secondaryFirmware)
          }
        ];
      }
    }
  });
</script>
