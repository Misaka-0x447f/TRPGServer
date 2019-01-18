<template>
  <div class="root">
    <div class="container">
      <label>
        <input type="text" v-model="storage">
      </label>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {

  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {get, set} from "lodash";

  export default Vue.extend({
    name: "ObjectSynchronizedInput",
    props: {
      object: {
        type: Object
      },
      path: {
        type: String
      }
    },
    data: () => {
      return {
        get,
        set,
        storage: ""
      };
    },
    mounted() {
      this.storage = get(this.object, this.path);
    },
    watch: {
      storage() {
        set(this.object, this.path, this.storage);
      }
    }
  });
</script>
