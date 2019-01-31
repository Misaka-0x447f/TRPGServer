<!--
  This is the content manager component;
  it decides which menu to deploy depends on the definition object;
-->
<template>
  <div class="root">
    <div class="container" v-for="(value, key) in this.definition">
      <txt v-if="value.style === MenuStyle.text" :text="getText(value, key)"></txt>
      <txt-area v-if="value.style === MenuStyle.textarea" :text="getText(value, key)"></txt-area>
      <click :isDisabled="isDisabled(value)" v-if="value.style === MenuStyle.click" :name="e(key)"
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
  import say, {dict} from "@/utils/i18n";
  import {MenuItem, MenuStyle} from "@/utils/SideTabHandler";
  import {emptyEventHandler} from "@/utils/TypeScript";

  export default Vue.extend({
    name: "SideTabManager",
    components: {
      txt: TextComponent,
      txtArea: TextareaComponent,
      click: ClickComponent
    },
    props: {
      definition: {
        type: Object
      }
    },
    data() {
      return {
        e: say,
        MenuStyle
      };
    },
    methods: {
      getText(value: any, key: string) {
        // condition: property 'handler' exist, then execute
        if (value.hasOwnProperty("handler")) {
          // noinspection TypeScriptValidateJSTypes
          const result: string | void = value.handler();
          if (typeof result === "string") {
            return result;
          }
        }
        // condition: no handler, use key as output
        return say(key as keyof typeof dict.zh);
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
