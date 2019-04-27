<template functional>
    <div class="root">
        <div class="container">

        </div>
    </div>
</template>
<style lang="stylus" scoped>
    .container {
      background url("../assets/wallpaper.jpg");
      width 100vw
      height 100vh
      overflow hidden
      position fixed
      z-index -65535
    }
</style>
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "Wallpaper"
  });
</script>
