<template>
  <div class="root">
    <div class="container">
      <names>
        {{e(ns, "arms")}}
      </names>
      <eq
        :backpack="backpack"
        :inventory="e(ns, 'builtInArms')"
        :slotsDef="maxSlots"
        :callback="backpackUpdate"
      >
      </eq>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {

  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {say} from "@/utils/i18n";
  import {ns} from "@/interfaces/Nechronica";
  import names from "@/components/propTitle.vue";
  import eq from "@/components/InputField/EquipModify/index.vue";
  import {EquipText} from "@/interfaces/Nechronica/Equips";

  export default Vue.extend({
    name: "Page5",
    components: {
      names,
      eq
    },
    computed: {
      maxSlots() {
        return [2, 2, 1];
      }
    },
    data: () => {
      return {
        e: say,
        ns,
        backpack: [] as EquipText[][],
      };
    },
    methods: {
      backpackUpdate() {
        console.log("backpackUpdated");
      }
    }
  });
</script>
