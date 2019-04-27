<template>
  <div class="root">
    <div class="container">
      <fl>
        <dia
          :title="title"
        >
          <slot></slot>
          <template #footer>
            <bu class="action-button" @click="act">
              {{action}}({{timer}})
            </bu>
          </template>
        </dia>
      </fl>
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

  import fl from "@/components/FullScreenFloating.vue";
  import dia from "@/components/Dialogs/Simple/index.vue";
  import bu from "@/components/InputField/Button.vue";

  import {say} from "@/utils/i18n";

  export default Vue.extend({
    name: "auth.vue",
    components: {
      fl,
      dia,
      bu
    },
    props: {
      title: {
        type: String
      },
      action: {
        type: String
      }
    },
    data: () => {
      return {
        e: say,
        timer: 29,
        timeoutNumber: NaN,
      };
    },
    mounted() {
      this.timeoutNumber = setInterval(() => {
        if (this.timer <= 0) {
          clearInterval(this.timeoutNumber);
          this.act();
          return;
        }
        this.timer--;
      }, 1000) as unknown as number;
    },
    beforeDestroy() {
      clearInterval(this.timeoutNumber);
    },
    methods: {
      act() {
        this.$emit("ok");
      }
    }
  });
</script>
