<template>
  <div class="root">
    <div class="container">
      <bu block @click="equipClick">
        <span v-if="hasEquipped">{{getEquippedText}}</span>
        <span v-if="!hasEquipped">
          <font-awesome-icon
            :icon="ico.plus"
          ></font-awesome-icon>
        </span>
      </bu>
      <div class="equipListContainer" v-if="showEquipList">
        <equips
          class="equipList"
          :list="sortedInvList"
          :tech="at[0] + 1"
          @change="equipSelect"
        ></equips>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    max-width: 6em;
    min-width: 2em;
  }

  .equipListContainer {
    position: relative;
  }

  .equipList {
    position: absolute;
    top: 0;
    z-index: 127;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {Backpack, EquipText} from "@/interfaces/Nechronica/Equips";
  import bu from "@/components/InputField/Button.vue";
  import {ico} from "@/utils/FontAwesome";
  import equips from "./EquipList.vue";
  import {cloneDeep, findIndex, isNull, reverse, sortBy} from "lodash";
  import {count} from "@/components/InputField/EquipModify/EquipListCount";
  import {xr} from "@/utils/lang";

  const sr = (backpack: Backpack, tech: number, slot: number): EquipText | null => {
    return cloneDeep(xr(xr(backpack, tech, []), slot, null));
  };

  export default Vue.extend({
    name: "EquipSlot",
    components: {
      bu,
      equips
    },
    props: {
      backpack: {
        type: Array as () => Backpack
        // dim1: tech level index (-1); dim2: slot index;
      },
      at: {
        // at index of backpack
        type: Array as () => number[]
      },
      inventory: {
        type: Array as () => EquipText[]
        // inventory for choose.
        // will not check tech levels.
      }
    },
    data: () => {
      return {
        ico,
        showEquipList: false
      };
    },
    computed: {
      hasEquipped(): boolean {
        return !isNull(sr(this.backpack, this.at[0], this.at[1]));
      },
      getEquippedText(): string {
        const read = sr(this.backpack, this.at[0], this.at[1]);

        if (!isNull(read)) {
          return read.text;
        }
        return "";
      },
      sortedInvList(): EquipText[] {
        return reverse(sortBy(this.inventory, ["tech"]));
      }
    },
    methods: {
      equipClick() {
        const turnOffCallback = () => {
          this.showEquipList = false;
        };

        if (!this.showEquipList) {
          this.showEquipList = true;
          if (count.length === 1) {
            count[0]();
            count.pop();
          }
          count.push(turnOffCallback);
        } else {
          count[0]();
          count.pop();
        }
      },
      equipSelect(label: string) {
        const tech = this.at[0];
        const slot = this.at[1];
        // read or create an equip here.
        const equipped = sr(this.backpack, tech, slot);
        if (!isNull(equipped)) {
          // a equip in this slot.
          this.inventory.push(equipped);
          this.backpack[tech].splice(slot, 1, null);
        }
        // ok no equip in this slot now. locate selected equip.
        const i = findIndex(this.inventory, {label});
        this.backpack[tech].splice(slot, 1, cloneDeep(this.inventory[i]));
        this.inventory.splice(i, 1);

        // close context menu if exist
        if (count.length > 0) {
          count[0]();
          count.pop();
        }

        // at last, emit.
        this.$emit("equip-change", cloneDeep(this.backpack[tech][slot]));
      }
    }
  });
</script>
