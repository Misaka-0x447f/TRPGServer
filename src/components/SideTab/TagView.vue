<template>
  <div class="root">
    <div
      class="container"
      :class="{
        active: isActive,
        top,
        odd,
        bottom
      }"
      @click="$emit('click')"
    >
      <font-awesome-icon
        :icon="this.icon"
        class="icon"
      ></font-awesome-icon>
      <div
        class="text"
        :class="{'non-asia': !isEastAsian()}"
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
    align-items: center;
    width: 1.2em;
    padding: 2.5em 0.5em;
    margin-bottom: -2em;
    clip-path: polygon(0 0, 100% 2em, 100% 100%, 0 calc(100% - 2em));
    word-break: break-all;
    overflow: hidden;
    z-index: 65535;
    cursor: pointer;
  }

  .container.top {
    padding-top: 1.5em;
    padding-bottom: 3em;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 2em));
  }

  .container.bottom {
    padding-top: 3em;
    padding-bottom: 3em;
    clip-path: polygon(0 2em, 100% 0, 100% 100%, 0 100%);
  }

  /**************************/

  .container {
    background: sidebar-edge-0;
    color: sidebar-font-0;
  }

  .container.odd {
    background-color: sidebar-edge-1;
  }

  .container.bottom {
    background: sidebar-edge-sp0;
  }

  .container.active {
    background: sidebar-edge-active-0;
    color: sidebar-font-active-0;
  }

  /*****************************/

  .non-asia {
    writing-mode: vertical-rl;
  }

  .icon {
    padding: 0.2em 0;
  }
  
  .text {
    position: relative;
    left: 0.1em;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {isEastAsian} from "@/utils/i18n";

  export default Vue.extend({
    name: "TagView",
    data() {
      return {
        isEastAsian
      };
    },
    props: {
      icon: {
        type: String,
        default: "user-friends"
      },
      isActive: {
        type: Boolean,
        default: false
      },
      odd: {
        type: Boolean,
        default: false
      },
      top: {
        type: Boolean,
        default: false
      },
      bottom: {
        type: Boolean,
        default: false
      }
    }
  });
</script>
