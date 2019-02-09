import {MenuStyle} from "@/utils/SideTabHandler";
<template>
  <div class="root">
    <div class="container">
      <ro :ro="isReadOnly"></ro>
      <table v-if="content.length">
        <tr>
          <th v-show="showId">{{e("propertyEditor", "identifier")}}</th>
          <th>{{e("propertyEditor", "value")}}</th>
          <th>{{e("propertyEditor", "text")}}</th>
        </tr>
        <!--suppress JSUnusedLocalSymbols -->
        <tr v-for="(_, i) in content" :data-i="i">
          <td v-show="showId">
            <txt v-model="content[i].id" :disabled="isReadOnly" :placeholder="e('propertyEditor', 'identifier')"></txt>
          </td>
          <td>
            <txt v-model="content[i].value" :disabled="isReadOnly" :placeholder="e('propertyEditor', 'value')"></txt>
          </td>
          <td>
            <txt v-model="content[i].text" :disabled="isReadOnly" :placeholder="e('propertyEditor', 'text')"></txt>
          </td>
        </tr>
      </table>
      <div class="clickTip" v-if="content.length === 0" @click="newLine">
        {{this.isReadOnly ? e("propertyEditor", "emptyWhileRO") : e("propertyEditor", "ContentEmpty")}}
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    height: 100%;
    text-align: left;
    position: relative;
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
    border-top: underline-0;
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
  import {PropertyData} from "@/utils/PropertyEditor";
  import {say} from "@/utils/i18n";
  import txt from "@/components/InputField/Input.vue";
  import {getAttrInEvent} from "@/utils/dom";
  import {cloneDeep, isNull, last, pullAt} from "lodash";
  import {sideTab} from "@/main";
  import {MenuStyle} from "@/utils/SideTabHandler";
  import {ico} from "@/utils/FontAwesome";
  import ro from "./ReadOnlyOverlay.vue";

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
      txt,
      ro
    },
    props: {
      content: {
        type: Array as () => PropertyData[]
      },
      isReadOnly: {
        type: Boolean,
        default: false
      }
    },
    data: (): {
      e: typeof say,
      pullAt: typeof pullAt,
      showId: boolean,
      history: History[]
    } => {
      return {
        e: say,
        pullAt,
        showId: false,
        history: []
      };
    },
    mounted() {
      window.addEventListener("keydown", this.keyEventHandler);
      sideTab.updateTab({
        editMenu: {
          icon: ico.userEdit,
          children: [
            {
              name: {
                scope: "propertyEditor",
                key: "undoDeleteLine"
              },
              style: MenuStyle.click,
              handler: this.undo,
              enabled: this.undoable
            }
          ]
        },
        viewMenu: {
          icon: ico.eye,
          children: [
            {
              name: {
                scope: "propertyEditor",
                key: "toggleIdentifier"
              },
              style: MenuStyle.click,
              handler: this.toggleIdView
            }
          ]
        }
      });
    },
    destroyed() {
      window.removeEventListener("keydown", this.keyEventHandler);
      sideTab.destroyTab({
        editMenu: [
          {
            scope: "propertyEditor",
            key: "undoDeleteLine"
          }
        ]
      });
    },
    methods: {
      keyEventHandler(e: KeyboardEvent) {
        if (this.isReadOnly) {
          return;
        }
        let eventAt;
        if (isNull(getAttrInEvent(e, "data-i"))) {
          eventAt = 0;
        } else {
          eventAt = parseInt(getAttrInEvent(e, "data-i") as string, 10);
        }

        if (e.code === "Enter") {
          if (isNull(getAttrInEvent(e, "data-i"))) {
            // got null, add line at the end of array
            this.newLine(this.content.length - 1);
          } else {
            this.newLine(eventAt);
          }
        } else if (e.key === "Delete") {
          this.history.push({
            changedLine: eventAt,
            mutation: mutation.del,
            data: this.content[eventAt]
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
        this.content.splice(line + 1, 0, placeholder);
        this.$forceUpdate();
      },
      deleteLine(line: number) {
        Vue.delete(this.content, line);
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
        return this.history.length > 0 && !this.isReadOnly;
      },
      toggleIdView() {
        this.showId = this.showId !== true;
      }
    }
  });
</script>
