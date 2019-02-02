<template>
  <div class="root">
    <div :class="{container: true, enabled: enabled}" @click="callback">
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
  }
    
  .container.enabled {
    border-color: button-0;
    color: button-0;
    cursor: pointer;
  }
  
  .container.enabled:hover {
    background: button-background-0;
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
      }
    },
    data: () => {
      return {};
    }
  });
</script>
