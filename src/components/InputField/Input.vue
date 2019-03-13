<template>
  <div class="root">
    <div :class="{container: true, withLabel: label !== ''}">
      <label class="contents">
        <input
          type="text"
          :value="value"
          @input="gotInputs"
          :placeholder="placeholder"
          :disabled="disabled"
        >
      </label>
      <div class="label" v-if="label">
        {{label}}
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    display: flex;
    align-items center;
    justify-content space-between;
  }

  .withLabel {
    border-bottom: underline-0;
  }

  .label {
    color: plain-text-0-weak;
  }

  .contents {
    flex: 1
  }

  input {
    background: none;
    border: none;
    outline: none;
    color: inherit;
    margin: 0.2em 0;
    width: 100%;
    font-size: inherit;
  }
</style>
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "SimpleInput",
    props: {
      label: {
        type: String,
        default: ""
      },
      value: {
        type: String
      },
      placeholder: {
        type: String,
        default: "/"
      },
      listenTo: {
        type: String,   // A string, not a method name.
        default: "input"
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      gotInputs(e: any) {
        this.$emit(this.listenTo, e.target.value);
      }
    }
  });
</script>
