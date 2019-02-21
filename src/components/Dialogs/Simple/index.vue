<template>
  <div class="root">
    <div class="container">
      <div class="title">
        <net v-if="isNetRelated"></net>
        <div class="title-text">{{title}}</div>
      </div>
      <bo></bo>
      <div class="dialog-content">
        <slot></slot>
      </div>
      <bo></bo>
      <div class="buttons">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    max-width: min(30em, 50%);
    text-align: initial;
  }

  .dialog-content {
    margin: 1em 7px;
    padding: 2em 1em;
    background: dialog-background-0;
  }

  .title {
    display: flex;
    justify-content: space-between;
    margin: 0.2em 0.5em;
  }

  .title-text {
    font-size: 1.2em;
    flex: 1;
    text-align: right;
  }

  .buttons {
    display: flex;
    margin: 0.5em 7px;
    justify-content: flex-end;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import bo from "./Border.vue";
  import net from "@/components/netstat.vue";

  export default Vue.extend({
    name: "SimpleInput",
    components: {
      bo,
      net
    },
    props: {
      title: {
        type: String,
        default: ""
      },
      isNetRelated: {
        type: Boolean,
        default: false
      }
    },
    data: () => {
      return {};
    }
  });
</script>
