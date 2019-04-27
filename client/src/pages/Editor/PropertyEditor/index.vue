<template>
  <div class="root">
    <div class="container">
      <st :def="stDef">
        <template #file>
          <bu @click="saveFile">
            <span>{{e(ns, "export")}}</span>
          </bu>
          <div>
            {{e(ns, "fileOperateTips")}}
          </div>
        </template>
        <template #edit>
          <bu @click="undo()" :enabled="undoable()">
            <span>{{e(ns, "undoDeleteLine")}}</span>
          </bu>
        </template>
        <template #view>
          <bu @click="toggleIdView()">
            <span>{{e(ns, "toggleIdentifier")}}</span>
          </bu>
        </template>
      </st>
      <ro :ro="isReadOnly"></ro>
      <table v-if="content.length">
        <tr>
          <th v-show="showId">{{e("propertyEditor", "identifier")}}</th>
          <th>{{e("propertyEditor", "value")}}</th>
          <th>{{e("propertyEditor", "text")}}</th>
        </tr>
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
  import {say} from "@/utils/i18n";
  import txt from "@/components/InputField/Input.vue";
  import ro from "./ReadOnlyOverlay.vue";
  import st from "@/components/SideTab/index.vue";
  import bu from "@/components/SideTab/SideTabContents/Button.vue";
  import {PropertyData} from "@/utils/PropertyEditor";
  import {getAttrInEvent} from "@/utils/dom";
  import {cloneDeep, isNull, last, pullAt, isUndefined} from "lodash";
  import {ico} from "@/utils/FontAwesome";
  import state from "@/utils/state";
  import saveAs from "file-saver";

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
      ro,
      st,
      bu
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
    data() {
      return {
        e: say,
        pullAt,
        showId: false,
        history: [] as History[],
        stDef: [
          {
            id: "file",
            text: "fileMenu",
            icon: ico.fileCode
          },
          {
            id: "edit",
            text: "editMenu",
            icon: ico.penSquare
          },
          {
            id: "view",
            text: "viewMenu",
            icon: ico.streetView
          }
        ],
        ns: "propertyEditor"
      };
    },
    mounted() {
      window.addEventListener("keydown", this.keyEventHandler);
    },
    destroyed() {
      window.removeEventListener("keydown", this.keyEventHandler);
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
        if (!isUndefined(last(this.history))) {
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
        this.showId = !this.showId;
      },
      saveFile() {
        // @ts-ignore
        saveAs(new File([JSON.stringify(state.editor.storage)], "character.json"));
      }
    }
  });
</script>
