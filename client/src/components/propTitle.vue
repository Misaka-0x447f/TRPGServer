<template>
  <div class="root">
    <div class="container">
      <span class="title">
        <slot></slot>
      </span>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    border-bottom: underline-0;
    display: flex;
    flex-direction: row-reverse;
  }
  
  .title {
    color: plain-text-0-weak;
    padding: 0.2em 0;
  }
</style>
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "propTitle",
    data: () => {
      return {};
    }
  });
</script>
