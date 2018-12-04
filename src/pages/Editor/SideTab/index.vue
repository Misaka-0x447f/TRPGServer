<template>
  <div class="root">
    <div class="container">
      <div class="tag">
        <slot name="icon"></slot>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    display: flex;
    flex-direction: row;
  }

  .tag {

  }
</style>
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "index",
    props: {
      visualName: {
        type: String
      }
    },
    data: () => {
      return {};
    }
  });
</script>
