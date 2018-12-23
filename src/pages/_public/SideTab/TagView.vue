<template functional>
  <div class="root" data-manuallyScoped-j3uasjk>
    <!--suppress JSValidateTypes -->
    <div
      :class="{
        container: props,
        active: props.isActive
      }"
      @click="props.clickHandler(props.tagName)"
    >
      <font-awesome-icon
        :icon="props.icon"
        class="icon"
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
    align-items: center;
    width: 1.2em;
    padding: 2.5em 0.5em;
    margin-bottom: -2em;
    clip-path: polygon(0 0, 100% 2em, 100% 100%, 0 calc(100% - 2em));
    word-break: break-all;
    position: relative;
    overflow: hidden;
    z-index: 65535;
    background: sidebar-edge-0;
    color: sidebar-font-0;
  }

  .root[data-manuallyScoped-j3uasjk]:nth-of-type(even) .container {
    background-color: sidebar-edge-1;
  }

  .root[data-manuallyScoped-j3uasjk]:first-of-type .container{
    padding-top: 1.5em;
    padding-bottom: 3em;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 2em));
  }

  .root[data-manuallyScoped-j3uasjk] .container.active {
    // clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 2em));
    background: sidebar-edge-active-0;
    color: sidebar-font-active-0;
  }

  .non-asia {
    writing-mode: vertical-rl;
  }

  .icon {
    padding: 0.2em 0;
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
      tagName: {
        type: String,
      },
      isActive: {
        type: Boolean,
        default: false
      },
      counter: {
        type: Number
      },
      clickHandler: {
        type: Function
      }
    }
  });
</script>
