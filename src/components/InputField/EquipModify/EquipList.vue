<template>
  <div class="root">
    <div class="container">
      <div class="equip" v-for="v in list" @click="callback(v.label)">
        <div class="title">
          {{v.text}}
        </div>
        <div class="desc">
          {{v.desc}}
        </div>
      </div>
      <div
        v-if="list.length === 0"
        class="empty"
      >
        {{e('global', 'noEquipAvailable')}}
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
  
  .empty {
    color: plain-text-0-hints;
    font-size: 1.2em;
    margin: 0.5em;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {EquipText} from "@/interfaces/Nechronica/Equips";
  import {getEmptyEventHandler} from "@/utils/TypeScript";
  import {say} from "@/utils/i18n";

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
      return {
        e: say
      };
    }
  });
</script>
