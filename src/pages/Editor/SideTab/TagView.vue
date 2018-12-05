<template functional>
  <div class="root">
    <div class="container">
      <font-awesome-icon
        :icon="props.icon"
      ></font-awesome-icon>
      <div
        :class="{'non-asia': !parent.$store.getters['public/isEastAsian']}"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    display: flex;
    flex-direction: column;
    width: 1.2em;
    word-break: break-all;
  }

  .non-asia {
    writing-mode: vertical-rl;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  
  export default Vue.extend({
    name: "TagView",
    props: {
      icon: {
        type: String,
        default: "user-friends"
      },
      isActive: {
        type: Boolean,
        default: false
      }
    }
  });
</script>
