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
          v-for="(value, key) in instance.storage"
          :key="key"
          :tagName="key"
          :clickHandler="tabClickHandler"
          :icon="value.icon"
          :isActive="isActive(key)"
        >
          {{e(key)}}
        </tag>
      </div>
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

  .vs {
    width: 0.3em;
    height: 100%;
    background: sidebar-edge-1;
    border-left: sidebar-font-active-0 1px solid;
  }

  .vs.active {
    background: sidebar-edge-active-0;
  }

  .side-enter-active, .side-leave-active {
    transition: width .5s;
  }

  .side-enter, .side-leave-to {
    width: 0;
  }

  .side-enter-to, .side-leave {
    width: 30vw;
  }

  .menu-content-container {
    background: container-background-0;
  }

  .overlay-container {
    position: absolute;
    top: 0;
    display: block;
    background: container-mask-0;
    width: 100vw;
    height: 100vh;
    z-index: 65530;
  }
    
  .background-ks3ja5sj-enter-active, .background-ks3ja5sj-leave-active {
    transition: opacity 0.5s;
  }
  
  .background-ks3ja5sj-enter, .background-ks3ja5sj-leave-to {
    opacity: 0;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import TagView from "./TagView.vue";
  import TagViewPadding from "./TagViewPadding.vue";
  import say from "../../../utils/i18n";
  import {sideTab} from "@/main";
  import sideTabManager from "./SideTabContents/index.vue";

  export default Vue.extend({
    name: "sidebarIndex",
    components: {
      tag: TagView,
      tagP: TagViewPadding,
      sm: sideTabManager
    },
    data: () => {
      return {
        instance: sideTab,
        definition: {},
        activeTab: "",
        e: say
      } as any;
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
