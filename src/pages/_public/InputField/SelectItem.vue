<template>
  <div class="root">
    <div class="container">
      <div v-for="(v, i) in items" v-show="i === page">
        <div class="name-container">
          <div class="selector">
            <div class="name">
              {{v.title}}
            </div>
            <bu :callback="prev" :enabled="prevAble" inline>
              <font-awesome-icon :icon="ico.chevronLeft"></font-awesome-icon>
            </bu>
            <bu :callback="next" :enabled="nextAble" inline>
              <font-awesome-icon :icon="ico.chevronRight"></font-awesome-icon>
            </bu>
          </div>
          <div class="title">
            {{title}}
          </div>
        </div>
        <div class="desc" v-if="v.hasOwnProperty('desc')">
          {{v.desc}}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    display: flex;
    width: 100%;
  }

  .container > div {
    width: 100%;
  }

  .name-container {
    display: flex;
    align-items: center;
    justify-content space-between;
    border-bottom: underline-0;
  }

  .selector {
    display: flex;
    align-items: center;
  }

  .title {
    color: plain-text-0-weak;
    user-select: none;
  }
    
  .name {
    margin-right: 0.5em;
    font-size: 1.2em;
    user-select: none;
  }

  .desc {
    margin: 0.5em 0;
    color: plain-text-0-weak;
    min-height: 2em;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import bu from "./Button.vue";
  import {ico} from "@/utils/FontAwesome";
  import {getEmptyEventHandler} from "@/utils/TypeScript";
  import {timeout} from "@/utils/lang";

  export interface Choices {
    label: string;  // label of an option. Will be passed to the handler.
    title: string;
    desc?: string;
  }

  export default Vue.extend({
    name: "SelectItem",
    components: {
      bu
    },
    props: {
      title: {
        type: String,
        default: ""
      },
      items: {
        type: Array
      },
      callback: {
        type: Function,
        default: getEmptyEventHandler()
      },
      default: {
        type: Number,
        default: 0
      }
    },
    data: () => {
      return {
        page: 0 as number,
        ico
      };
    },
    watch: {
      page() {
        this.$emit("page", this.items[this.page]);
      }
    },
    async mounted() {
      this.page = this.default;
      await timeout(100);
      this.$emit("page", this.items[this.page]);
    },
    computed: {
      prevAble(): boolean {
        return this.page > 0;
      },
      nextAble(): boolean {
        return this.page < (this.items as Choices[]).length - 1;
      }
    },
    methods: {
      prev() {
        if (this.prevAble) {
          this.page--;
        }
      },
      next() {
        if (this.nextAble) {
          this.page++;
        }
      },
    }
  });
</script>
