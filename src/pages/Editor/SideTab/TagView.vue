<template>
  <div class="root">
    <div :class="{container: true, active: this.isActive}">
      <font-awesome-icon
        :icon="this.icon"
        class="icon"
      ></font-awesome-icon>
      <div
        :class="{'non-asia': !this.$store.getters['public/isEastAsian']}"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    display: flex;
    flex-direction: column;
    width: 1.2em;
    margin-bottom: -0.5em;
    padding: 0.5em 0.5em 2em 0.5em;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 2em));
    word-break: break-all;
    position: relative;
    overflow: hidden;
    z-index: 65535;
    background: sidebar-edge-0;
    color: sidebar-font-0;
  }
    
  .active {
    background: sidebar-edge-active-0;
    color: sidebar-font-active-0;
  }

  .non-asia {
    writing-mode: vertical-rl;
  }

  .icon {
    padding: 0.2em 0;
  }
</style>
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "TagView",
    props: {
      icon: {
        type: String,
        default: "user-friends"
      },
      isActive: {
        type: Boolean,
        default: false
      }
    }
  });
</script>
