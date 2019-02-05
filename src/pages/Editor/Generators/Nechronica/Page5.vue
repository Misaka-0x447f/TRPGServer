import {enhance} from "@/interfaces/Nechronica";
import {enhance} from "@/interfaces/Nechronica";
import {enhance} from "@/interfaces/Nechronica";
import {enhance} from "@/interfaces/Nechronica";
import {enhance} from "@/interfaces/Nechronica";
<template>
  <div class="root">
    <div class="container">
      <div>
        <names>
          {{e(ns, "arms")}}
        </names>
        <eq
          :backpack="arms"
          :inventory="e(ns, 'builtInArms')"
          :slotsDef="arSlots"
        >
        </eq>
      </div>
      <div>
        <names>
          {{e(ns, "evolve")}}
        </names>
        <eq
          :backpack="evolve"
          :inventory="e(ns, 'builtInEvolve')"
          :slotsDef="evSlots"
        >
        </eq>
      </div>
      <div>
        <names>
          {{e(ns, "modify")}}
        </names>
        <eq
          :backpack="modify"
          :inventory="e(ns, 'builtInModify')"
          :slotsDef="moSlots"
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
  import {enhance, getSlotsFromShared, ns} from "@/interfaces/Nechronica";
  import names from "@/components/propTitle.vue";
  import eq from "@/components/InputField/EquipModify/index.vue";
  import {Backpack} from "@/interfaces/Nechronica/Equips";
  import {updateProperty} from "@/utils/PropertyEditor";

  export default Vue.extend({
    name: "Page5",
    components: {
      names,
      eq
    },
    data: () => {
      return {
        e: say,
        ns,
        arms: [] as Backpack,
        evolve: [] as Backpack,
        modify: [] as Backpack,
        maxSlots: []
      };
    },
    computed: {
      arSlots() {
        return getSlotsFromShared(enhance.arms);
      },
      evSlots() {
        return getSlotsFromShared(enhance.evolve);
      },
      moSlots() {
        return getSlotsFromShared(enhance.modify);
      }
    },
    watch: {
      arms() {
        updateProperty("arms", this.arms);
      },
      evolve() {
        updateProperty("evolve", this.evolve);
      },
      modify() {
        updateProperty("modify", this.modify);
      }
    }
  });
</script>
