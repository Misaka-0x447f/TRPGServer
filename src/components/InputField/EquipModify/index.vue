<template>
  <div class="root">
    <div class="container">
      <div v-if="totalSlotsCount === 0" class="not-available">
        {{e('global', 'noSlotsAvailable')}}
      </div>
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
              @equip-change="$emit('equip-change')"
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
  .container {
    min-width: 4em;
  }

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
  }

  .title {
    margin: 0 0 0.2em 1em;
  }

  .not-available {
    color: plain-text-0-hints;
    margin: calc(0.5em / 1.2) 0;
    font-size: 1.2em;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {Backpack, EquipText} from "@/interfaces/Nechronica/Equips";
  import {say} from "@/utils/i18n";
  import {ns} from "@/interfaces/Nechronica";
  import names from "@/components/propTitle.vue";
  import sl from "./Slot.vue";
  import {sum} from "lodash";

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
    computed: {
      totalSlotsCount(): number {
        return sum(this.slotsDef);
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
