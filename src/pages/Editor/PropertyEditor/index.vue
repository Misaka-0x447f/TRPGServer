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
          <!--suppress EqualityComparisonWithCoercionJS -->
          <td v-show="confirmDeleteAt != i">
            <in :object="content.data[i]" k="id"></in>
          </td>
          <!--suppress EqualityComparisonWithCoercionJS -->
          <td v-show="confirmDeleteAt != i">
            <in :object="content.data[i]" k="value"></in>
          </td>
          <!--suppress EqualityComparisonWithCoercionJS -->
          <td v-show="confirmDeleteAt != i">
            <in :object="content.data[i]" k="text"></in>
          </td>
          <!--suppress EqualityComparisonWithCoercionJS -->
          <td class="confirmDelete" v-if="confirmDeleteAt == i" rowspan="true"
              @click="deleteLine(confirmDeleteAt)">
            点击这里以确认删除; Esc: 取消;
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

  .clickTip {
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
        confirmDeleteAt: -1,
        pullAt
      };
    },
    mounted() {
      const up = () => {
        const out = [];
        for (const i of this.content.data) {
          out.push(i.id);
        }
        console.log(out);
        this.$forceUpdate();
      };
      setInterval(up, 1000);
    },
    methods: {
      keyDownHandler(e: KeyboardEvent) {
        // Case: delete
        if (e.key === "Delete" && this.confirmDeleteAt < 0) {
          this.confirmDeleteAt = getAttrInEvent(e, "data-i");
          this.$forceUpdate();
        } else if (this.confirmDeleteAt >= 0) {
          this.confirmDeleteAt = -1;
        } else if (e.key === "Enter") {
          this.newLine(getAttrInEvent(e, "data-i") as number);
        }
        this.$forceUpdate();
      },
      newLine(line: number) {
        console.log(line);
        const placeholder: PropertyData = {
          id: "-",
          value: "-",
          text: "-"
        };
        // TODO: buggy
        this.content.data.splice(line + 1, 0, placeholder);
        this.$forceUpdate();
      },
      deleteLine(line: number) {
        Vue.delete(this.content.data, line);
        this.confirmDeleteAt = -1;
        this.$forceUpdate();
      }
    }
  });
</script>
