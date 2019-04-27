<template>
  <div class="root">
    <div class="container" :class="{enabled, danger}" @click="click">
      <slot></slot>
      <font-awesome-icon
        icon="chevron-right"
      ></font-awesome-icon>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center
    line-height: 2em;
    cursor: pointer;
  }

  .container:not(.enabled) {
    color: sidebar-invalid;
    text-decoration: line-through;
  }

  .danger {
    color: button-red;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import EventManager, {EventType} from "@/utils/event";

  export default Vue.extend({
    name: "Click",
    props: {
      enabled: {
        type: Boolean,
        default: true
      },
      danger: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      click() {
        EventManager.emit(EventType.menuButtonClick);
        this.$emit("click");
      }
    }
  });
</script>
