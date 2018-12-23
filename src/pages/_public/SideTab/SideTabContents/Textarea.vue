<template>
  <div class="root">
    <div class="container" v-for="value in wordProcessor(this.text)">
      {{value}}
      <br />
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
    name: "TextareaView",
    props: {
      text: {
        type: String
      }
    },
    methods: {
      wordProcessor(t: string) {
        return t.split("\n");
      }
    }
  });
</script>
