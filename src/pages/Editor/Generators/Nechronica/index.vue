<template>
  <div class="root">
    <div class="container">
      <div class="title">
        {{e("nechronicaDataGenTitle")}}
      </div>
      <page1 v-show="page === 1"></page1>
      <page2 v-show="page === 2"></page2>
      <div class="button-group">
        <bu :callback="nextStep" :enabled="nextEnabled">
          {{e("nextStep")}}
        </bu>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    text-align: left;
  }

  .button-group {
    display: flex;
    flex-direction: row-reverse;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {PropertyData} from "@/utils/PropertyEditor";
  import page1 from "./Page1.vue";
  import page2 from "./Page2.vue";
  import say from "@/utils/i18n";
  import bu from "@/pages/_public/InputField/Button.vue";

  const maxPage = 2;

  export default Vue.extend({
    name: "nechronicaGenerator",
    components: {
      page1,
      page2,
      bu
    },
    props: {
      storage: {
        type: Object as () => PropertyData[]
      }
    },
    data: () => {
      return {
        page: 1,
        nextEnabled: true,
        e: say
      };
    },
    methods: {
      nextStep() {
        if (this.checkNextAble()) {
          this.page++;
        }
      },
      checkNextAble() {
        if (this.page < maxPage) {
          this.nextEnabled = this.page + 1 < maxPage;
          return true;
        }
        this.nextEnabled = false;
        return false;
      }
    }
  });
</script>
