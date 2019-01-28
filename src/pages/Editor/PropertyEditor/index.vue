<template>
  <div class="root">
    <div class="container" @keydown="keyDownHandler">
      <table v-if="content.data.length">
        <tr>
          <th>{{e("identifier")}}</th>
          <th>{{e("value")}}</th>
          <th>{{e("text")}}</th>
        </tr>
        <!--suppress JSUnusedLocalSymbols -->
        <tr v-for="(_, i) in content.data" :data-i="i">
          <td>
            <in :object="content.data[i]" k="id" :p="e('identifier')"></in>
          </td>
          <td>
            <in :object="content.data[i]" k="value" :p="e('value')"></in>
          </td>
          <td>
            <in :object="content.data[i]" k="text" :p="e('text')"></in>
          </td>
        </tr>
      </table>
      <div class="clickTip" v-if="content.data.length === 0" @click="newLine">
        {{e("propertyEditorContentEmpty")}}
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    text-align: left;
    margin: 1em;
  }

  .clickTip, .confirmDelete {
    cursor: pointer
  }

  table {
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
  }

  tr:not(:first-of-type) {
    border: table-splitter 0 solid;
    border-top-width: 1px;
  }

  th, td {
    padding: 0.2em 0.3em;
  }

  th {
    padding-bottom: 0.3em;
  }

  th, td {
    font-weight: inherit;
    text-align: inherit;
    vertical-align: inherit;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {Property, PropertyData} from "@/utils/PropertyEditor";
  import say from "@/utils/i18n";
  import inp from "@/pages/_public/InputField/ObjectSyncInput.vue";
  import {getAttrInEvent} from "@/utils/dom";
  import {pullAt} from "lodash";

  export default Vue.extend({
    name: "PropertyEditor",
    components: {
      in: inp
    },
    props: {
      content: {
        type: Object as () => Property
      }
    },
    data: () => {
      return {
        e: say,
        pullAt
      };
    },
    // mounted() {
    //   window.addEventListener("keypress", this.keyDownHandler);
    // },
    // destroyed() {
    //   window.removeEventListener("keypress", this.keyDownHandler);
    // },
    methods: {
      keyDownHandler(e: KeyboardEvent) {
        if (e.key === "Delete") {
          this.deleteLine(parseInt(getAttrInEvent(e, "data-i") as string, 10));
        } else if (e.key === "Enter") {
          this.newLine(parseInt(getAttrInEvent(e, "data-i") as string, 10));
        }
        // this.$forceUpdate();
      },
      newLine(line: number) {
        const placeholder: PropertyData = {
          id: "",
          value: "",
          text: ""
        };
        this.content.data.splice(line + 1, 0, placeholder);
        this.$forceUpdate();
      },
      deleteLine(line: number) {
        Vue.delete(this.content.data, line);
        this.$forceUpdate();
      }
    }
  });
</script>
