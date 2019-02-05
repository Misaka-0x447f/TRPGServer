<template>
  <div class="root">
    <div class="container">

    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {

  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {EquipText} from "@/interfaces/Nechronica/Equips";

  export default Vue.extend({
    name: "EquipModifyIndex",
    props: {
      equipped: {
        type: Array as () => EquipText[][]
        // dim1: tech levels; dim2: equip;
      },
      inventory: {
        type: Array as () => EquipText[]
      },
      slotsDef: {
        type: Array as () => number[]
      },
      callback: {
        type: Function as unknown as () => (() => void)  // do callback if inv update
      }
    },
    data: () => {
      return {};
    }
  });
</script>
