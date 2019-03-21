<template>
  <div class="root">
    <div class="container" :class="{enabled}" @click="$emit('click')">
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
    min-height: 2em;
    padding: 1em 1.5em 0 1.5em;
    cursor: pointer;
  }

  .container:not(.enabled) {
    color: sidebar-invalid;
    text-decoration: line-through;
  }
</style>
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "Click",
    props: {
      enabled: {
        type: Boolean,
        default: true
      }
    }
  });
</script>
