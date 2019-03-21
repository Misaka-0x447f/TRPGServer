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
          v-for="i in def"
          :key="i.id"
          :icon="i.icon"
          :isActive="isActive(i.id)"
          @click="tabClickHandler(i.id)"
        >
          {{e("menuName", i.text)}}
        </tag>
      </div>
      <vs :isWhite="isActive()"></vs>
      <div :class="{vs: true, active: isActive()}"></div>
      <transition name="side">
        <div>
          <div
            v-for="i in def"
            v-show="isActive(i.id)"
            class="menu-content-container"
            @click="closeTab"
          >
            <slot :name="i.id">
              {{i.id}}
            </slot>
          </div>
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
  import vs from "../VerticalSplitter.vue";
  import {TabDef} from "@/interfaces/sideTab";

  export default Vue.extend({
    name: "sidebarIndex",
    components: {
      tag: TagView,
      vs
    },
    props: {
      // tab definitions;
      def: {
        type: Array as () => TabDef[]
      }
    },
    data: () => {
      return {
        activeTab: "",
        e: say,
      };
    },
    methods: {
      tabClickHandler(id: string) {
        if (this.isActive(id)) {
          this.closeTab();
        } else {
          this.openTab(id);
        }
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
      },
      closeTab() {
        this.activeTab = "";
      }
    }
  });
</script>
