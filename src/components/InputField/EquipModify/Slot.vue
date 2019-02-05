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
    name: "Slot",
    props: {
      equipped: {
        type: Object as () => EquipText
        // equipped in this slot
      },
      inventory: {
        type: Array as () => EquipText[]
        // inventory for choose.
        // will not check tech levels.
      },
      callback: {
        type: Function as unknown as () => (() => void)  // do callback if slot update
      }
    },
    data: () => {
      return {};
    }
  });
</script>
