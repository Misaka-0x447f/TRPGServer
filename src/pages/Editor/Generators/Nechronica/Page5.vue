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
          :slotsDef="maxSlots"
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
          :slotsDef="maxSlots"
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
          :slotsDef="maxSlots"
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
  import {Backpack} from "@/interfaces/Nechronica/Equips";
  import {updateProperty} from "@/utils/PropertyEditor";

  export default Vue.extend({
    name: "Page5",
    components: {
      names,
      eq
    },
    computed: {
      maxSlots() {
        return [1, 1, 0];
      }
    },
    data: () => {
      return {
        e: say,
        ns,
        arms: [] as Backpack,
        evolve: [] as Backpack,
        modify: [] as Backpack
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
    }
  });
</script>
