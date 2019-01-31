<template>
  <div class="root">
    <div :class="{container: true, disabled: this.isDisabled}" @click="this.click">
      {{this.name}}
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
  }

  .disabled {
    color: nearly-grey;
  }
</style>
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "Click",
    props: {
      name: {
        type: String,
        default: "undefined click menu"
      },
      click: {
        type: Function
      },
      isDisabled: {
        type: Boolean,
        default: false
      }
    },
    data: () => {
      return {};
    }
  });
</script>
