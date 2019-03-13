<template>
  <div class="root">
    <div
      :class="{container: true, enabled: enabled && throttleEnabled, inline, block}"
      :tabindex="enabled ? 0 : -1"
      @click="clicked"
      @keypress.enter="clicked"
    >
      <slot></slot>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    border: button-0-disabled 1px solid;
    color: button-0-disabled;
    padding: 0.5em 1em;
    display: inline-block;
    cursor: not-allowed;
    user-select: none;
  }

  .container.enabled {
    border-color: button-0;
    color: button-0;
    cursor: pointer;
  }

  .container.enabled:hover {
    background: button-background-0;
  }
    
  .container:focus {
    outline: button-0-focused;
  }
    
  .container.inline {
    border: none;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
  }

  .container.block {
    display: flex;
    align-items center;
    justify-content center;
  }
</style>
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "Button",
    props: {
      enabled: {
        type: Boolean,
        default: true
      },
      throttle: {
        type: Number,
        default: 30
      },
      inline: {
        type: Boolean,
        default: false
      },
      block: {
        type: Boolean,
        default: false
      }
    },
    data: () => {
      return {
        throttleEnabled: true
      };
    },
    methods: {
      clicked() {
        if (this.enabled) {
          this.$emit("click");
          this.throttleEnabled = false;
          const enable = () => {
            this.throttleEnabled = true;
          };
          setTimeout(enable, this.throttle);
        }
      }
    }
  });
</script>
