<template>
  <div class="root">
    <div class="container">
      <div
        v-for="(slots, tech) in slotsDef"
        class="edge"
        v-if="slots > 0"
      >
        <div class="equipListContainer">
          <div
            v-for="v in slots"
            class="equip"
          >
            <sl
              :inventory="inventory"
              :backpack="backpack"
              :at="[tech, v - 1]"
            ></sl>
          </div>
        </div>
        <span class="title">
          {{e(ns, "techLevel")}}{{tech + 1}}
        </span>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .edge {
    border-bottom: underline-0;
    display: flex;
    justify-content space-between;
    align-items flex-end;
    color: plain-text-0-weak;
  }

  .equipListContainer {
    display: flex;
    flex: 1;
    margin-top: 0.5em;
  }

  .equip {
    flex: 1;
    margin-right: 0.2em;
    max-width: 6em;
  }

  .title {
    margin: 0 0 0.2em 1em;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {Backpack, EquipText} from "@/interfaces/Nechronica/Equips";
  import {say} from "@/utils/i18n";
  import {ns} from "@/interfaces/Nechronica";
  import names from "@/components/propTitle.vue";
  import sl from "./Slot.vue";

  export default Vue.extend({
    name: "EquipModifyIndex",
    components: {
      names,
      sl
    },
    props: {
      backpack: {
        type: Array as () => Backpack
        // dim1: tech levels; dim2: which equip;
      },
      inventory: {
        type: Array as () => EquipText[]
      },
      slotsDef: {
        type: Array as () => number[]
      }
    },
    data: () => {
      return {
        e: say,
        ns
      };
    }
  });
</script>
