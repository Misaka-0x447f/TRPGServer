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
  }

  .act {
    color led-act-off;
    margin-left: 0.5em;
  }

  .act.active {
    color led-act;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {sharedNetStatus, sharedNetStatusProxy} from "@/utils/ws";

  export default Vue.extend({
    name: "netstat",
    data: () => {
      return {
        link: false,
        act: false,
        actLED: false
      };
    },
    mounted() {
      sharedNetStatusProxy.registerTrigger(() => {
        this.link = sharedNetStatus.link;
        if (sharedNetStatus.RX || sharedNetStatus.TX) {
          this.act = true;
        }
      });
      setInterval(() => {
        if (this.act) {
          this.actLED = true;
          this.act = false;
        } else {
          this.actLED = false;
        }
      }, 333);
    }
  });
</script>
