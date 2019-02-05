<template>
  <div class="root">
    <div :class="{container: true, enabled, inline, block}" @click="clicked">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    border: button-0-disabled 1px solid;
    color: button-0-disabled;
    padding: 0.5em 1em;
    display: inline-block;
    cursor: not-allowed;
    user-select: none;
  }

  .container.enabled {
    border-color: button-0;
    color: button-0;
    cursor: pointer;
  }

  .container.enabled:hover {
    background: button-background-0;
  }

  .container.inline {
    border: none;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
  }
  
  .container.block {
    display: flex;
    align-items center;
    justify-content center;
  }
</style>
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "Button",
    props: {
      callback: {
        type: Function
      },
      enabled: {
        type: Boolean,
        default: true
      },
      inline: {
        type: Boolean,
        default: false
      },
      block: {
        type: Boolean,
        default: false
      }
    },
    data: () => {
      return {};
    },
    methods: {
      clicked() {
        if (this.enabled) {
          this.callback();
        }
      }
    }
  });
</script>
