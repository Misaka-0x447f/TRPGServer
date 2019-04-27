<template>
  <div class="root">
    <div class="container">
      <div class="point"></div>
      <div class="bar"></div>
      <div class="point"></div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    height: 1px;
    display: flex;
  }

  .bar, .point {
    background-color: dialog-border-0;
  }

  .bar {
    flex: 1;
    box-sizing border-box;
    margin: 0 3px;
  }

  .point {
    width: 5px;
  }
</style>
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "Border",
    data: () => {
      return {};
    }
  });
</script>
