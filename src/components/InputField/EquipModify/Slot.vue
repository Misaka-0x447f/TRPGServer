<template>
  <div class="root">
    <div class="container">
      <bu block :callback="equipClick">
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
          :list="inventory"
        ></equips>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
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
  import {EquipText} from "@/interfaces/Nechronica/Equips";
  import bu from "@/components/InputField/Button.vue";
  import {ico} from "@/utils/FontAwesome";
  import equips from "./EquipList.vue";
  import {count} from "@/components/InputField/EquipModify/EquipListCount";

  export default Vue.extend({
    name: "EquipSlot",
    components: {
      bu,
      equips
    },
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
      return {
        ico,
        showEquipList: false
      };
    },
    computed: {
      hasEquipped(): boolean {
        return this.equipped.hasOwnProperty("label");
      },
      getEquippedText(): string {
        if (this.hasEquipped) {
          return this.equipped.text;
        }
        return "";
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
      }
    }
  });
</script>
