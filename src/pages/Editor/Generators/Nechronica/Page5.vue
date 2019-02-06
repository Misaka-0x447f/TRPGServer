<template>
  <div class="root">
    <div class="container">
      <div>
        <names>
          {{e(ns, "arms")}}
        </names>
        <eq
          :backpack="s.arms"
          :inventory="armsInv"
          :slotsDef="maxSlots['arms']"
        >
        </eq>
      </div>
      <div>
        <names>
          {{e(ns, "evolve")}}
        </names>
        <eq
          :backpack="s.evolve"
          :inventory="evolveInv"
          :slotsDef="maxSlots['evolve']"
        >
        </eq>
      </div>
      <div>
        <names>
          {{e(ns, "modify")}}
        </names>
        <eq
          :backpack="s.modify"
          :inventory="modifyInv"
          :slotsDef="maxSlots['modify']"
        >
        </eq>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container > div {
    margin-bottom: 2em;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {say} from "@/utils/i18n";
  import {ns} from "@/interfaces/Nechronica";
  import names from "@/components/propTitle.vue";
  import eq from "@/components/InputField/EquipModify/index.vue";
  import {cloneDeep} from "lodash";
  import {computed, computedProxy, s} from "@/pages/Editor/Generators/Nechronica/SharedStorage";

  export default Vue.extend({
    name: "Page5",
    components: {
      names,
      eq
    },
    data() {
      return {
        e: say,
        ns,
        armsInv: cloneDeep(say(ns, "builtInArms")),
        evolveInv: cloneDeep(say(ns, "builtInEvolve")),
        modifyInv: cloneDeep(say(ns, "builtInModify")),
        maxSlots: {
          arms: [1, 1, 0],
          evolve: [1, 1, 0],
          modify: [0, 0, 0]
        },
        s
      };
    },
    mounted() {
      const updateSlots = () => {
        this.maxSlots = cloneDeep(computed);
      };
      computedProxy.registerTrigger(updateSlots);
    }
  });
  
  // TODO: known bug: equip numbers will not check when EP changed.
</script>
