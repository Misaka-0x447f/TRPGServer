<template>
  <div class="root">
    <div class="container">
      <div
        class="equip"
        v-for="v in list"
        v-if="v.tech <= tech"
        @click="callback(v.label)"
      >
        <div class="equip-detail">
          <div class="title">
            {{v.text}}
          </div>
          <div class="desc">
            {{v.desc}}
          </div>
        </div>
        <div
          class="tech"
          :class="{
            lowLevel: v.tech < tech,
            okLevel: v.tech === tech
          }"
        >
          {{e(ns, 'techLevel') + v.tech}}
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
    max-height: 30vh;
    overflow: auto;
  }

  .equip {
    padding: 0.5em;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }

  .equip-detail {
    display: flex;
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

  .lowLevel {
    // if tech level is lower than slot level
    color: equip-tech-low-0;
  }

  .okLevel {
    // if tech level is ok
    color: equip-tech-ok-0;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {EquipText} from "@/interfaces/Nechronica/Equips";
  import {getEmptyEventHandler} from "@/utils/TypeScript";
  import {say} from "@/utils/i18n";
  import {ns} from "@/interfaces/Nechronica";

  export default Vue.extend({
    name: "EquipList",
    components: {},
    props: {
      list: {
        type: Array as () => EquipText[]
      },
      tech: {
        // tech level of this slot in.
        type: Number
      },
      callback: {
        type: Function,
        default: getEmptyEventHandler()
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
