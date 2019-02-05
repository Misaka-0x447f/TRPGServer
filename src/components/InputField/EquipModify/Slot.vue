<template>
  <div class="root">
    <div class="container">
      <bu block>
        <span v-if="hasEquipped">{{getEquippedText}}</span>
        <span v-if="!hasEquipped">
          <font-awesome-icon
            :icon="ico.plus"
          ></font-awesome-icon>
        </span>
      </bu>
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
  import bu from "@/components/InputField/Button.vue";
  import {ico} from "@/utils/FontAwesome";

  export default Vue.extend({
    name: "EquipSlot",
    components: {
      bu
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
        ico
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
    }
  });
</script>
