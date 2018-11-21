<template>
  <div class="root">
    <div class="container">
      <slot></slot>
      <span>{{this.text}}</span>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container
    width 30vw
    height 60vh
    display flex
    flex-direction column
    align-items center
    justify-content center
    
  .container:hover
    background container-background-0-fade

  .container > svg
    font-size 3em
    margin-bottom 1em

  .container > span
    font-size 1.2em
</style>
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "DualMenuButton",
    props: {
      text: {
        type: String,
        default: "Menu"
      }
    },
    data: () => {
      return {};
    }
  });
</script>
