<template functional>
  <div class="root">
    <!--suppress JSValidateTypes -->
    <div :class="{
      container: props,
      active: props.isActive,
      even: props.queueOrder % 2 === 0,
      first: props.queueOrder === 0
    }">
      <font-awesome-icon
        :icon="props.icon"
        class="icon"
      ></font-awesome-icon>
      <div
        :class="{'non-asia': !parent.$store.getters['public/isEastAsian']}"
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
    padding: 2.5em 0.5em;
    margin-bottom: -2em;
    clip-path: polygon(0 0, 100% 2em, 100% 100%, 0 calc(100% - 2em));
    word-break: break-all;
    position: relative;
    overflow: hidden;
    z-index: 65535;
    background: sidebar-edge-0;
    color: sidebar-font-0;
  }

  .container.even {
    background-color: sidebar-edge-1;
  }

  .container.first {
    padding-top: 1.5em;
    padding-bottom: 3em;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 2em));
  }

  .container.active {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 2em));
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
      },
      queueOrder: {
        type: Number,
        default: 0
      }
    }
  });
</script>
