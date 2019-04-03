<template>
  <div class="root">
    <div class="container">
      <fl>
        <dia
          :title="e('global', 'authErrorTitle')"
        >
          {{e('global', 'authError')}}
          <template #footer>
            <bu class="logout-button" @click="logOut">
              {{e("onlineGame", "logOut")}}({{timer}})
            </bu>
          </template>
        </dia>
      </fl>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .logout-button {
    margin-left: auto;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  
  import fl from "@/components/FullScreenFloating.vue";
  import dia from "@/components/Dialogs/Simple/index.vue";
  import bu from "@/components/InputField/Button.vue";
  
  import {say} from "@/utils/i18n";
  import {logOut} from "@/utils/ls";

  export default Vue.extend({
    name: "index",
    components: {
      fl,
      dia,
      bu
    },
    data: () => {
      return {
        e: say,
        timer: 29,
        timeoutNumber: NaN,
        logOut
      };
    },
    mounted() {
      this.timeoutNumber = setInterval(() => {
        if (this.timer <= 0) {
          clearInterval(this.timeoutNumber);
          logOut();
          return;
        }
        this.timer--;
      }, 1000) as unknown as number;
    },
    beforeDestroy() {
      clearInterval(this.timeoutNumber);
    }
  });
</script>
