<template>
  <div class="root">
    <div class="container">
      <ex
        :title="e('global', 'authErrorTitle')"
        :action="e('onlineGame', 'logOut')"
        @ok="logOut"
      >
        {{e('global', 'authError')}}
      </ex>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .action-button {
    margin-left: auto;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  
  import ex from "@/components/Dialogs/ExceptionDialog.vue";
  
  import {logOut} from "@/utils/ls";
  import {say} from "@/utils/i18n";

  export default Vue.extend({
    name: "auth.vue",
    components: {
      ex
    },
    data: () => {
      return {
        logOut,
        e: say
      };
    }
  });
</script>
