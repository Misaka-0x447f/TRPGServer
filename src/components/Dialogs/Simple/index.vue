<template>
  <div class="root">
    <div class="container">
      <div class="title">
        <span>{{title}}</span>
      </div>
      <bo></bo>
      <div class="dialog-content">
        <slot></slot>
      </div>
      <bo></bo>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    max-width: min(30em, 50%);
  }

  .dialog-content {
    margin: 1em 0.5em;
    padding: 1em 0.5em;
    background: dialog-background-0;
  }
  
  .title {
    text-align: right;
    font-size: 1.2em;
    margin: 0.2em 0;
    margin-right: 7px;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import bo from "./Border.vue";

  export default Vue.extend({
    name: "SimpleInput",
    components: {
      bo
    },
    props: {
      title: {
        type: String,
        default: ""
      }
    },
    data: () => {
      return {};
    }
  });
</script>
