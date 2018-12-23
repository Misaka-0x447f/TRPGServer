<template>
  <div class="root">
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
      <div class="menu-content-container">
        <sm :definition="this.definition"></sm>
      </div>
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

  .menu-content-container {
    background: container-background-0;
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
            this.activeTab = e;
            this.definition = this.instance.storage[e].children;
          } else {
            this.activeTab = "";
            this.definition = {};
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
      }
    }
  });
</script>
