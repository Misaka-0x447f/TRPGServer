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
  import ch, {Choices} from "@/pages/_public/InputField/SelectItem.vue";
  import {say} from "@/utils/i18n";
  import {getPropertyById, updateProperty} from "@/utils/PropertyEditor";
  import bonus, {DecideDef, PointDef} from "@/pages/_public/InputField/BonusPoint.vue";
  import {idEnums} from "@/interfaces/Nechronica";

  const enum enhance {
    arms,
    evolve,
    modify
  }

  const namespace = "nechronica";

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
        ns: namespace,
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
        return say(namespace, "builtInFirmware");
      },
      indArray() {
        return say(namespace, "builtInIndividuality");
      }
    },
    methods: {
      primaryFirmware(e: Choices) {
        updateProperty("primaryFirmware", e.label);
        this.firm1 = e.label;
        this.setBonusDef();
      },
      secondaryFirmware(e: Choices) {
        updateProperty("secondaryFirmware", e.label);
        this.firm2 = e.label;
        this.setBonusDef();
      },
      individuality(e: Choices) {
        updateProperty("individuality", e.label);
      },
      bonusCallback(e: { common: DecideDef[] }) {
        updateProperty("enhance", e.common);
      },
      setBonusDef() {
        this.bonusDef.initialPoint = [
          {
            label: "arms",
            text: say(namespace, "arms"),
            inherited: this.getInheritedEP(enhance.arms)
          },
          {
            label: "evolve",
            text: say(namespace, "evolve"),
            inherited: this.getInheritedEP(enhance.evolve)
          },
          {
            label: "modify",
            text: say(namespace, "modify"),
            inherited: this.getInheritedEP(enhance.modify)
          }
        ];
      },
      getInheritedEP(which: enhance) {
        const map = {
          Stacy: [1, 1, 0],
          Thanatos: [1, 0, 1],
          Gothic: [0, 1, 1],
          Requiem: [2, 0, 0],
          Baroque: [0, 2, 0],
          Romanesque: [0, 0, 2]
        };

        if (!map.hasOwnProperty(this.firm1)) {
          throw new Error(`unknown firmware ${this.firm1}. contact the factory.`);
        }

        if (!map.hasOwnProperty(this.firm2)) {
          throw new Error(`unknown firmware ${this.firm2}. contact the factory.`);
        }

        // @ts-ignore; already checked at this point.
        return (map[this.firm1] as number[])[which] + (map[this.firm2] as number[])[which];
      }
    }
  });
</script>
