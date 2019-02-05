<template>
  <div class="root">
    <div class="container">
      <names>
        {{e(ns, "modify")}}
      </names>
      <eq
        :backpack="backpack"
        :inventory="e(ns, 'builtInModify')"
        :slotsDef="maxSlots"
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
  import {Backpack} from "@/interfaces/Nechronica/Equips";

  export default Vue.extend({
    name: "Page5",
    components: {
      names,
      eq
    },
    computed: {
      maxSlots() {
        return [3, 3, 3];
      }
    },
    data: () => {
      return {
        e: say,
        ns,
        backpack: [] as Backpack,
      };
    }
  });
</script>
