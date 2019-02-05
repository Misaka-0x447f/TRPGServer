<template>
  <div class="root">
    <div class="container">
      <div
        v-for="(slots, tech) in slotsDef"
        class="edge"
      >
        <div class="equipList">
          <div
            v-for="v in slots"
            class="equip"
          >
            <sl
              :equipped="safeRead(tech, v)"
              :inventory="inventory"
              :callback="slotCallback"
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
  
  .equipList {
    display: flex;
    flex: 1;
    margin-top: 0.5em;
  }
  
  .equip {
    flex: 1;
    margin-right: 0.2em;
  }
  
  .title {
    margin: 0 0 0.2em 1em;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {EquipText} from "@/interfaces/Nechronica/Equips";
  import {say} from "@/utils/i18n";
  import {ns} from "@/interfaces/Nechronica";
  import names from "@/components/propTitle.vue";
  import sl from "./Slot.vue";
  import {xr} from "@/utils/lang";

  export default Vue.extend({
    name: "EquipModifyIndex",
    components: {
      names,
      sl
    },
    props: {
      backpack: {
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
      return {
        e: say,
        ns
      };
    },
    methods: {
      slotCallback(e: any) {
        console.log(e);
      },
      safeRead(tech: number, v: number) {
        return xr(xr(this.backpack, tech, []), v, {});
      }
    }
  });
</script>
