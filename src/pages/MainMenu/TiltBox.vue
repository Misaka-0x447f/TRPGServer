<template>
  <div class="root">
    <div class="container" @mousemove="mouseMoveHandler" :style="styleSto">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container
    display flex
    background container-background-0-fade-0
</style>
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "TiltBox",
    data: () => {
      return {
        styleSto: {
          transform: "rotate3d(0, 0, 0, 60deg)"
        }
      };
    },
    methods: {
      mouseMoveHandler(e: MouseEvent) {
        const position = (e.clientX - document.body.offsetWidth / 2) / 20;
        console.log(position);
        this.styleSto.transform = `rotate3d(0, 1, 0, ${position / 2}deg)`;
      }
    }
  });
</script>
