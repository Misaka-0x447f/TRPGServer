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
        <tr v-for="(_, i) in content.data">
          <td>
            <in :object="content" :path="`data[${i}].id`"></in>
          </td>
          <td>
            <in :object="content" :path="`data[${i}].value`"></in>
          </td>
          <td>
            <in :object="content" :path="`data[${i}].text`"></in>
          </td>
        </tr>
      </table>
      <div v-if="content.data.length === 0">{{e("propertyEditorContentEmpty")}}</div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    text-align: left;
    margin: 1em;
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
  import {Property} from "@/utils/PropertyEditor";
  import say from "@/utils/i18n";
  import inp from "@/pages/_public/InputField/ObjectSyncInput.vue";

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
        e: say
      };
    }
  });
</script>
