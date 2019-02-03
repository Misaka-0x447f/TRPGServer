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
        <bu :callback="nextStep" :enabled="nextEnabled">
          {{e("global", "nextStep")}}
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
</style>
<script lang="ts">
  import Vue from "vue";
  import {createProperty, PropertyData} from "@/utils/PropertyEditor";
  import page1 from "./Page1.vue";
  import page2 from "./Page2.vue";
  import page3 from "./Page3.vue";
  import {say} from "@/utils/i18n";
  import bu from "@/pages/_public/InputField/Button.vue";

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
        page: 1,
        nextEnabled: true,
        e: say
      };
    },
    mounted() {
      createProperty("gameType", "", "Nechronica");
      createProperty("name", say("nechronica", "characterName"));
      createProperty("age", say("nechronica", "characterAge"));
      createProperty("desc", say("nechronica", "characterDesc"));
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
