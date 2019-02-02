<template>
  <div class="root">
    <transition name="background-ks3ja5sj">
      <div
        v-if="isActive()"
        class="overlay-container"
        @click="closeTab"
      ></div>
    </transition>
    <div class="container">
      <div
        class="tab-tags"
      >
        <tag
          v-for="i in sortedTagList"
          :key="i._private_key"
          :tagName="i._private_key"
          :clickHandler="tabClickHandler"
          :icon="i.icon"
          :isActive="isActive(i._private_key)"
        >
          {{e("menuName", i._private_key)}}
        </tag>
      </div>
      <vs :isWhite="isActive()"></vs>
      <div :class="{vs: true, active: isActive()}"></div>
      <transition name="side">
        <div v-if="isActive()" class="menu-content-container">
          <sm :definition="this.definition"></sm>
        </div>
      </transition>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    display: flex;
    flex-direction: row;
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    z-index: 65535;
  }

  .tab-tags {
    display: flex;
    flex-direction: column;
  }
    
  .side-enter-active, .side-leave-active {
    transition: width .5s cubic-bezier(0, 0.5, 0.25, 1);
  }

  .side-enter, .side-leave-to {
    width: 0;
  }

  .side-enter-to, .side-leave {
    width: 30vw;
  }

  .menu-content-container {
    background: sidebar-background-0;
  }

  .overlay-container {
    position: fixed;
    top: 0;
    display: block;
    background: sidebar-mask-0;
    width: 100vw;
    height: 100vh;
    z-index: 65530;
  }

  .background-ks3ja5sj-enter-active, .background-ks3ja5sj-leave-active {
    transition: opacity .5s;
  }

  .background-ks3ja5sj-enter, .background-ks3ja5sj-leave-to {
    opacity: 0;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import TagView from "./TagView.vue";
  import {say} from "@/utils/i18n";
  import {sideTab} from "@/main";
  import sideTabManager from "./SideTabContents/index.vue";
  import {cloneDeep, forIn, sortBy} from "lodash";
  import {emptyEventHandler} from "@/utils/TypeScript";
  import vs from "../VerticalSplitter.vue";
  
  export default Vue.extend({
    name: "sidebarIndex",
    components: {
      tag: TagView,
      sm: sideTabManager,
      vs
    },
    data: () => {
      return {
        instance: sideTab,
        definition: {},
        activeTab: "",
        e: say,
      } as any;
    },
    computed: {
      sortedTagList() {
        const copy: any = cloneDeep(sideTab.storage);
        forIn(copy, (value, key) => {
          copy[key]._private_key = key;
        });
        return sortBy(copy, ["index"]);
      }
    },
    mounted() {
      sideTab.registerTabDestroyMethod(this.closeTab);
    },
    beforeDestroy() {
      sideTab.registerTabDestroyMethod(emptyEventHandler);
    },
    methods: {
      tabClickHandler(e: string) {
        if (this.instance.storage.hasOwnProperty(e)) {
          if (this.activeTab !== e) {
            this.openTab(e);
          } else {
            this.closeTab();
          }
          return;
        }
        throw new Error(`Unexpected tab ${e}`);
      },
      isActive(key?: string) {
        if (typeof key === "string") {
          return this.activeTab === key;
        } else {
          return this.activeTab !== "";
        }
      },
      openTab(e: string) {
        this.activeTab = e;
        this.definition = this.instance.storage[e].children;
      },
      closeTab() {
        this.activeTab = "";
        this.definition = {};
      }
    }
  });
</script>
