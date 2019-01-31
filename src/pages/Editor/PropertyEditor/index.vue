<template>
  <div class="root">
    <div class="container">
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
  import {cloneDeep, isNull, last, pullAt} from "lodash";
  import {sideTab} from "@/main";
  import {MenuStyle} from "@/utils/SideTabHandler";
  import {ico} from "@/utils/FontAwesome";

  enum mutation {
    del = "delete"
  }

  interface History {
    changedLine: number;
    data?: PropertyData;
    mutation: mutation;
  }

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
    data: (): {
      e: typeof say,
      pullAt: typeof pullAt,
      history: History[]
    } => {
      return {
        e: say,
        pullAt,
        history: []
      };
    },
    mounted() {
      window.addEventListener("keydown", this.keyEventHandler);
      sideTab.updateTab({
        editMenu: {
          icon: ico.userEdit,
          children: {
            undoDeleteLine: {
              style: MenuStyle.click,
              handler: this.undo,
              enabled: this.undoable
            }
          }
        }
      });
    },
    destroyed() {
      window.removeEventListener("keydown", this.keyEventHandler);
      sideTab.destroyTabByPath({
        editMenu: ["undoDeleteLine"]
      });
    },
    methods: {
      keyEventHandler(e: KeyboardEvent) {
        let eventAt;
        if (isNull(getAttrInEvent(e, "data-i"))) {
          eventAt = 0;
        } else {
          eventAt = parseInt(getAttrInEvent(e, "data-i") as string, 10);
        }

        if (e.code === "Enter") {
          if (isNull(getAttrInEvent(e, "data-i"))) {
            // got null, add line at the end of array
            this.newLine(this.content.data.length - 1);
          } else {
            this.newLine(eventAt);
          }
        } else if (e.key === "Delete") {
          this.history.push({
            changedLine: eventAt,
            mutation: mutation.del,
            data: this.content.data[eventAt]
          });
          this.deleteLine(eventAt);
        }
      },
      newLine(line: number, data?: PropertyData) {
        let placeholder: PropertyData = {
          id: "",
          value: "",
          text: ""
        };
        if (data) {
          placeholder = cloneDeep(data);
        }
        this.content.data.splice(line + 1, 0, placeholder);
        this.$forceUpdate();
      },
      deleteLine(line: number) {
        Vue.delete(this.content.data, line);
        this.$forceUpdate();
      },
      undo() {
        if (last(this.history) !== undefined) {
          const l = last(this.history) as History;
          if (l.mutation === mutation.del) {
            this.newLine(l.changedLine as number, l.data);
            this.history.pop();
          } else {
            throw new Error("unknown undo task");
          }
        } else {
          throw new Error("nothing to undo");
        }
      },
      undoable() {
        return this.history.length > 0;
      }
    }
  });
</script>
