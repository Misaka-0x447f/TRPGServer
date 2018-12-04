<template>
  <div class="root">
    <div class="container" @mousemove="mouseMoveHandler" @mousedown="mouseDownHandler" :style="styleSto">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container
    display flex
    background container-background-0-fade-0
</style>
<style lang="stylus">
  @keyframes tilt-left-manual-scoped-kafl2192
    from
      transform rotate3d(0, 1, 0, 0deg)
    20%
      transform rotate3d(0, 1, 0, -15deg)
    to
      transform rotate3d(0, 1, 0, 0deg)
      
  @keyframes tilt-right-manual-scoped-kafl2192
    from
      transform rotate3d(0, 1, 0, 0deg)
    20%
      transform rotate3d(0, 1, 0, 15deg)
    to
      transform rotate3d(0, 1, 0, 0deg)
  
</style>
<script lang="ts">
  import Vue from "vue";
  import {timeout} from "@/utils/System";

  export default Vue.extend({
    name: "TiltBox",
    data: () => {
      return {
        styleSto: {
          transform: "rotate3d(0, 1, 0, 0deg)",
          animation: ""
        },
        animationPlaying: false
      };
    },
    methods: {
      mouseMoveHandler(e: MouseEvent) {
        const position = (e.clientX - document.body.offsetWidth / 2) / 20;
        this.styleSto.transform = `rotate3d(0, 1, 0, ${position / 5}deg)`;
      },
      async mouseDownHandler(e: MouseEvent) {
        if (this.animationPlaying) {
          return;
        }
        this.animationPlaying = true;
        if (e.clientX < document.body.offsetWidth / 2) {
          this.styleSto.animation = "tilt-left-manual-scoped-kafl2192 0.8s";
        } else {
          this.styleSto.animation = "tilt-right-manual-scoped-kafl2192 0.8s";
        }
        await timeout(1000);
        this.styleSto.animation = "";
        this.$nextTick(() => {
          this.animationPlaying = false;
        });
      }
    }
  });
</script>
