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

  export interface Equip {
    label: string,
    text: string,
    desc: string,
    tech: number  // tech level (T1~T3)
  }

  export default Vue.extend({
    name: "EquipModifyIndex",
    props: {
      definition: {
        type: Array as () => Equip[]
      },
      slots: {
        type: Array as () => number[3]
      },
      callback: {
        type: Function
      }
    },
    data: () => {
      return {
        inventory: [] as string[],  // available equipments
        equipped: [] as string[][]  // only store labels
        // dim1: tech levels; dim2: slots;
      };
    }
  });
</script>
