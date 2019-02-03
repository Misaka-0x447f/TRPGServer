<template>
  <div class="root">
    <div class="container">
      <div class="title">
        {{e("nechronica", "title")}}
      </div>
      <page1 v-show="page === 1"></page1>
      <page2 v-show="page === 2"></page2>
      <page3 v-show="page === 3"></page3>
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
</template>
<style lang="stylus" scoped>
  .container {
    text-align: left;
  }

  .title {
    font-size: 1.2em;
    margin-bottom: 0.5em;
  }

  .button-group {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 0.5em;
  }
  
  .button-group > * {
    margin-left: 0.5em;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {PropertyData} from "@/utils/PropertyEditor";
  import page1 from "./Page1.vue";
  import page2 from "./Page2.vue";
  import page3 from "./Page3.vue";
  import {say} from "@/utils/i18n";
  import bu from "@/pages/_public/InputField/Button.vue";
  import {init} from "@/interfaces/Nechronica";

  const maxPage = 3;

  export default Vue.extend({
    name: "nechronicaGenerator",
    components: {
      page1,
      page2,
      page3,
      bu
    },
    props: {
      storage: {
        type: Object as () => PropertyData[]
      }
    },
    data: () => {
      return {
        page: 3,
        nextEnabled: true,
        e: say
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
