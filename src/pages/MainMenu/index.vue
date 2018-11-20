<template>
  <div class="container">
    <div>
      {{e("intro")}}
    </div>
    <dialog-box>
      <create></create>
    </dialog-box>
  </div>
</template>
<style lang="stylus" scoped>
</style>
<script lang="ts">
  import Vue from "vue";
  import say from "@/utils/i18n";
  import Create from "@/pages/Create/index.vue";
  import Dialog from "@/pages/_/Dialog/DialogBox.vue";

  export default Vue.extend({
    name: "MainMenu",
    components: {
      create: Create,
      dialogBox: Dialog
    },
    data: () => {
      return {
        e: say
      };
    }
  });

</script>
