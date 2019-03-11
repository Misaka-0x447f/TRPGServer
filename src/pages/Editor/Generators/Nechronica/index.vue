<template>
  <div class="root">
    <div class="container">
      <page1 v-show="page === 1"></page1>
      <page2 v-show="page === 2"></page2>
      <page3 v-show="page === 3"></page3>
      <page4 v-show="page === 4"></page4>
      <page5 v-show="page === 5"></page5>
      <div class="title">
        <span class="title-text">
          {{e(ns, "title")}}
        </span>
        <div class="button-group">
          <bu :callback="nextStep" :enabled="nextAble">
            {{e("global", "nextStep")}}
          </bu>
          <bu :callback="prevStep" :enabled="prevAble">
            {{e("global", "prevStep")}}
          </bu>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    text-align: left;
    display: flex;
    flex-direction: column-reverse;
  }

  .title {
    margin-bottom: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title-text {
    font-size: 1.2em;
  }

  .button-group {
    display: flex;
    flex-direction: row-reverse;
  }

  .button-group > * {
    margin-left: 0.5em;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import page1 from "./Page1.vue";
  import page2 from "./Page2.vue";
  import page3 from "./Page3.vue";
  import page4 from "./Page4.vue";
  import page5 from "./Page5.vue";
  import {say} from "@/utils/i18n";
  import bu from "@/components/InputField/Button.vue";
  import {init, ns} from "@/interfaces/Nechronica";
  import {storageProxy} from "@/pages/Editor/Generators/Nechronica/SharedStorage";

  const maxPage = 5;

  export default Vue.extend({
    name: "nechronicaGenerator",
    components: {
      page1,
      page2,
      page3,
      page4,
      page5,
      bu
    },
    data: () => {
      return {
        page: 1,
        nextEnabled: true,
        e: say,
        ns,
        storageProxy
      };
    },
    mounted() {
      init();
    },
    computed: {
      prevAble(): boolean {
        return this.page > 1;
      },
      nextAble(): boolean {
        return this.page < maxPage;
      }
    },
    methods: {
      prevStep() {
        if (this.prevAble) {
          this.page--;
        }
      },
      nextStep() {
        if (this.nextAble) {
          this.page++;
        }
      }
    }
  });
</script>
