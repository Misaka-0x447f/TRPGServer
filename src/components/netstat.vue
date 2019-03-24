<template>
  <div class="root">
    <div class="container">
      <div class="link" :class="{active: link}">link</div>
      <div class="act" :class="{active: actLED}">act</div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    display: flex;
  }
    
  .container > div {
    font-family "Source Code Pro", Monospaced;
  }
    
  .link {
    color: led-link-off;
  }

  .link.active {
    color: led-link;
    text-shadow: getShadow(led-link);
  }
    
  .act {
    color led-act-off;
    margin-left: 0.5em;
  }
    
  .act.active {
    color led-act;
    text-shadow: getShadow(led-act);
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {linkStatus} from "@/utils/ws";

  export default Vue.extend({
    name: "netstat",
    data: () => {
      return {
        link: false,
        actLED: false,
        intervalID: NaN
      };
    },
    mounted() {
      this.intervalID = setInterval(this.update, 333) as unknown as number;
    },
    beforeDestroy() {
      // prevent memory leak;
      clearInterval(this.intervalID);
    },
    methods: {
      update() {
        this.link = linkStatus.link;
        this.actLED = linkStatus.act > 0 as boolean;
      }
    }
  });
</script>
