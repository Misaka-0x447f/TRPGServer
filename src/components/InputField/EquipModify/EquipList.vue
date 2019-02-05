<template>
  <div class="root">
    <div class="container">
      <div class="equip" v-for="v in list">
        <div class="title">
          {{v.text}}
        </div>
        <div class="desc">
          {{v.desc}}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    padding: 0.5em 0;
    min-width: 30em;
    background: context-menu-0;
    box-sizing: border-box;
  }

  .equip {
    padding: 0.5em;
    display: flex;
    cursor: pointer;
  }

  .equip:hover {
    background: context-menu-0-active;
  }

  .title {
    font-size: 1.5em;
    min-width: 4em;
    margin-right: 0.5em;
    white-space: nowrap;
  }
  
  .desc {
    color: plain-text-0-weak;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {EquipText} from "@/interfaces/Nechronica/Equips";
  import {getEmptyEventHandler} from "@/utils/TypeScript";

  export default Vue.extend({
    name: "EquipList",
    components: {},
    props: {
      list: {
        type: Array as () => EquipText[]
      },
      callback: {
        type: Function,
        default: getEmptyEventHandler()
      }
    },
    data: () => {
      return {};
    }
  });
</script>
