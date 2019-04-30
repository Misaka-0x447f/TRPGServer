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
      <div class="side-tabs">
        <div
          class="menu-tags"
        >
          <tag
            v-for="(v, i) in def"
            :key="v.id"
            :icon="v.icon"
            :isActive="isActive(v.id)"
            @click="tabClickHandler(v.id)"
            :top="i === 0"
            :odd="i % 2 === 1"
          >
            {{e("menuName", v.text)}}
          </tag>
        </div>
        <div
          class="run-tags"
        >
          <tag
            :icon="ico.compass"
            :isActive="isActive('_switch_to')"
            @click="tabClickHandler('_switch_to')"
            bottom
          >
            {{e(ns, "run")}}
          </tag>
        </div>
      </div>
      <vs :isWhite="isActive()"></vs>
      <div :class="{vs: true, active: isActive()}"></div>
      <transition name="side-di5am519">
        <div
          class="menu-content-container"
          v-show="isActive()"
        >
          <div
            v-if="activeTab === '_switch_to'"
            v-show="isActive('_switch_to')"
            class="menu-content"
          >
            <bu @click="$router.push({name: RouterName.editor})">
              {{e(ns, "editor")}}
            </bu>
            <bu @click="$router.push({name: RouterName.register})">
              {{e(ns, "online")}}
            </bu>
          </div>
          <div
            v-for="i in def"
            v-show="isActive(i.id)"
            class="menu-content"
          >
            <slot
              :name="i.id"
            >
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
    text-align: initial;
    display: flex;
    flex-direction: row;
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    z-index: 65535;
  }
  
  .side-tabs {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .menu-tags {
    display: flex;
    flex-direction: column;
  }

  .side-di5am519-enter-active, .side-di5am519-leave-active {
    transition: width .8s cubic-bezier(.19, 1, .22, 1);
  }

  .side-di5am519-enter, .side-di5am519-leave-to {
    width: 0;
  }

  .menu-content {
    box-sizing border-box;
    padding: 1.5em;
  }

  @media (min-width: 500px) {
    .side-di5am519-enter-to, .side-di5am519-leave, .menu-content {
      width: 30vw;
    }
  }

  @media (max-width: 500px) {
    .side-di5am519-enter-to, .side-di5am519-leave, .menu-content {
      width: calc(100vw - 2.5em);
    }
  }

  .menu-content-container {
    background: sidebar-background-0;
  }

  .overlay-container {
    position: fixed;
    top: 0;
    left: 0;
    display: block;
    background: sidebar-mask-0;
    width: 100vw;
    height: 100vh;
    z-index: 65530;
  }

  .background-ks3ja5sj-enter-active, .background-ks3ja5sj-leave-active {
    transition: opacity .8s cubic-bezier(.19, 1, .22, 1);
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
  import {isNull} from "lodash";
  import EventManager, {ev} from "@/utils/event";
  import {ico} from "@/utils/FontAwesome";
  import bu from "./SideTabContents/Button.vue";
  import {RouterName} from "@/router";

  export default Vue.extend({
    name: "sidebarIndex",
    components: {
      tag: TagView,
      vs,
      bu
    },
    props: {
      // tab definitions;
      def: {
        type: Array as () => TabDef[]
      },
      startup: {
        type: String,
        default: null
      }
    },
    data: () => {
      return {
        activeTab: "",
        e: say,
        ico,
        ns: "global",
        RouterName
      };
    },
    mounted() {
      if (!isNull(this.startup)) {
        this.activeTab = this.startup;
      }
      EventManager.on(ev.menuButtonClick, this.closeTab);
    },
    beforeDestroy() {
      EventManager.off(ev.menuButtonClick, this.closeTab);
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
