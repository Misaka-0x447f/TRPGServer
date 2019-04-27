<template>
  <div class="root">
    <div class="container">
      <div class="margin-top"></div>
      <div class="inner-container">
        <slot></slot>
      </div>
      <div class="margin-bottom"></div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* 
    margin-top percentage will not work
    it calc based on width
  */
  .margin-top {
    flex: 2;
  }

  .margin-bottom {
    flex: 5;
  }

  .inner-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "FullScreenFloating"
  });
</script>
