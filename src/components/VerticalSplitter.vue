<template functional>
  <div class="root" data-v-scope="3h6c3e1x">
    <div :class="{container: true, white: props.isWhite}">
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .root [data-v-scope="3h6c3e1x"] {
    height: 100%;
  }
  
  .container {
    width: 0.3em;
    height: 100%;
    background: sidebar-edge-1;
    border-left: sidebar-splitter 1px solid;
  }

  .container.white {
    background: sidebar-edge-active-0;
    border-left: sidebar-splitter-active 1px solid;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  
  export default Vue.extend({
    name: "VerticalSplitter",
    props: {
      isWhite: {
        type: Boolean,
        default: false
      }
    }
  });
</script>
