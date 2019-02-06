<template>
  <div class="root">
    <div class="container">
      <div>
        <names>
          {{e(ns, "arms")}}
        </names>
        <eq
          :backpack="arms"
          :inventory="cloneDeep(e(ns, 'builtInArms'))"
          :slotsDef="maxSlots['arms']"
        >
        </eq>
      </div>
      <div>
        <names>
          {{e(ns, "evolve")}}
        </names>
        <eq
          :backpack="evolve"
          :inventory="cloneDeep(e(ns, 'builtInEvolve'))"
          :slotsDef="maxSlots['evolve']"
        >
        </eq>
      </div>
      <div>
        <names>
          {{e(ns, "modify")}}
        </names>
        <eq
          :backpack="modify"
          :inventory="cloneDeep(e(ns, 'builtInModify'))"
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
  import {enhance, getSlotsFromShared, ns} from "@/interfaces/Nechronica";
  import names from "@/components/propTitle.vue";
  import eq from "@/components/InputField/EquipModify/index.vue";
  import {Backpack} from "@/interfaces/Nechronica/Equips";
  import {updateProperty} from "@/utils/PropertyEditor";
  import {sharedUpdateListener} from "@/pages/Editor/Generators/Nechronica/Page4SharedStorage";
  import {cloneDeep} from "lodash";

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
        maxSlots: {
          arms: [1, 1, 0],
          evolve: [1, 1, 0],
          modify: [0, 0, 0]
        },
        cloneDeep
      };
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
    },
    mounted() {
      sharedUpdateListener.push(this.updateSlot);
    },
    methods: {
      updateSlot() {
        this.maxSlots[enhance.arms] = getSlotsFromShared(enhance.arms);
        this.maxSlots[enhance.evolve] = getSlotsFromShared(enhance.evolve);
        this.maxSlots[enhance.modify] = getSlotsFromShared(enhance.modify);
      }
    }
  });
</script>
