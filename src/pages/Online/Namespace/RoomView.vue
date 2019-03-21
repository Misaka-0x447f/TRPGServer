<template>
  <div class="root">
    <div class="container">
      <dia
        isNetRelated
        :title="e(ns, 'briefingRoom')"
      >
        
      </dia>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {

  }
</style>
<script lang="ts">
  import Vue from "vue";
  import dia from "@/components/Dialogs/Simple/index.vue";
  import {ns} from "@/interfaces/Online";

  export default Vue.extend({
    name: "RoomView",
    components: {
      dia
    },
    data: () => {
      return {
        ns
      };
    }
  });
</script>
