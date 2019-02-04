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
  import {Equip} from "@/pages/_public/InputField/EquipModify/index.vue";

  export default Vue.extend({
    name: "Slot",
    props: {
      definition: {
        type: Array as () => Equip[]
      },
      inventory: {
        type: Array as () => string[]
      },
      level: {
        type: Number
      },
      callback: {
        type: Function
      }
    },
    data: () => {
      return {};
    }
  });
</script>
