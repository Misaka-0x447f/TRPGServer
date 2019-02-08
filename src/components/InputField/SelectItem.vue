<template>
  <div class="root">
    <div class="container">
      <div v-for="(v, i) in items" v-show="i === page">
        <div class="name-container">
          <div class="selector">
            <div v-if="unset" class="name unset">
              {{e("global", "unspecified")}}
            </div>
            <div v-else class="name">
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
        <div class="hint" v-if="v.hasOwnProperty('desc') && !unset">
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
    margin-bottom: 0.5em;
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

  .hint {
    margin: 0.5em 0;
    color: plain-text-0-weak;
    min-height: 2em;
  }

  .unset {
    color: invalid
  }
</style>
<script lang="ts">
  /*
  * This component will not do callback at initial.
  * */

  import Vue from "vue";
  import bu from "./Button.vue";
  import {ico} from "@/utils/FontAwesome";
  import {getEmptyEventHandler} from "@/utils/TypeScript";
  import {say} from "@/utils/i18n";

  export interface Choices {
    label: string;  // label of an option. Will be passed to the handler.
    title: string;
    desc: string;
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
        type: Array as () => Choices[]
      },
      callback: {
        type: Function,
        default: getEmptyEventHandler()
      }
    },
    data: () => {
      return {
        page: 1,
        unset: true,
        ico,
        e: say
      };
    },
    watch: {
      page() {
        this.$emit("page", this.items[this.page]);
      }
    },
    computed: {
      prevAble(): boolean {
        if (this.unset) {
          return true;
        }
        return this.page > 0;
      },
      nextAble(): boolean {
        if (this.unset) {
          return true;
        }
        return this.page < (this.items as Choices[]).length - 1;
      }
    },
    methods: {
      prev() {
        if (this.unset) {
          this.page = 0;
          this.unset = false;
        } else if (this.prevAble) {
          this.page--;
        }
      },
      next() {
        if (this.unset) {
          this.page = 0;
          this.unset = false;
        } else if (this.nextAble) {
          this.page++;
        }
      },
    }
  });
</script>
