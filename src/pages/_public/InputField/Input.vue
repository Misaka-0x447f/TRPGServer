<template>
  <label>
    <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :placeholder="placeholder"
    >
  </label>
</template>
<style lang="stylus" scoped>
  input {
    background: none;
    border: none;
    outline: none;
    color: inherit;
    padding: 0.2em 0;
    width: 100%;
  }
</style>
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "SimpleInput",
    props: {
      value: {
        type: String
      },
      placeholder: {
        type: String,
        default: "/"
      }
    }
  });
</script>
