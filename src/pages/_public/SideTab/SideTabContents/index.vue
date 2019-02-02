<!--
  This is the content manager component;
  it decides which menu to deploy depends on the definition object;
-->
<template>
  <div class="root">
    <div class="container" v-for="value in this.definition">
      <txt v-if="value.style === MenuStyle.text" :text="getText(value)"></txt>
      <txt-area v-if="value.style === MenuStyle.textarea" :text="getText(value)"></txt-area>
      <click :isDisabled="isDisabled(value)" v-if="value.style === MenuStyle.click" :name="getText(value, true)"
             :click="useHandler(value)"></click>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    width: 30vw;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import TextComponent from "./Text.vue";
  import ClickComponent from "./Click.vue";
  import TextareaComponent from "./Textarea.vue";
  import {say} from "@/utils/i18n";
  import {MenuItem, MenuStyle} from "@/utils/SideTabHandler";
  import {emptyEventHandler} from "@/utils/TypeScript";

  export default Vue.extend({
    name: "SideTabContentsIndex",
    components: {
      txt: TextComponent,
      txtArea: TextareaComponent,
      click: ClickComponent
    },
    props: {
      definition: {
        type: Array as () => MenuItem[]
      }
    },
    data() {
      return {
        e: say,
        MenuStyle
      };
    },
    methods: {
      getText(value: MenuItem, doNotUseHandler?: boolean) {
        const flag = doNotUseHandler === true; // default: false

        // condition: property 'handler' exist, then try get name in the handler
        if (flag !== true && value.hasOwnProperty("handler")) {
          // Any, but must has a handler prop! So let's try to invoke.
          // noinspection TypeScriptValidateJSTypes
          const result = (value as any).handler();
          if (typeof result === "string") {
            return result;
          }
          // failed... try the next one
        }
        // condition: no handler, use key as output
        return say(value.name.scope, value.name.key);
      },
      useHandler(item: MenuItem) {
        if (typeof item.handler === "function") {
          if (this.isDisabled(item)) {
            return emptyEventHandler();
          } else {
            return item.handler;
          }
        }
        return emptyEventHandler();
      },
      isDisabled(item: MenuItem) {
        return typeof item.enabled === "function" && item.enabled() === false;
      }
    }
  });
</script>
