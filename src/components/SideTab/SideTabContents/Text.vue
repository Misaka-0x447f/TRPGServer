<template functional>
  <div class="root">
    <div class="container">
      {{props.text}}
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    display: flex;
    justify-content: flex-start;
    align-items: center
    min-height: 2em;
    padding: 1em 1.5em 0 1.5em;
  }
</style>
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "TextView",
    props: {
      text: {
        type: String
      }
    }
  });
</script>
