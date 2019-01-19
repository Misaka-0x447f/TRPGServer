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
  input {
    background: none;
    border: none;
    outline: none;
    color: inherit;
    padding: 0.2em 0;
    width: 100%;
  }
</style>
<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "ObjectSynchronizedInput",
    props: {
      object: {
        type: Object
      },
      k: {
        type: String
      }
    },
    data: () => {
      return {
        storage: ""
      };
    },
    mounted() {
      // noinspection TypeScriptUnresolvedFunction
      this.storage = this.object[this.k];
    },
    watch: {
      storage() {
        Vue.set(this.object, this.k, this.storage);
      },
      object() {
        this.storage = this.object[this.k];
      }
    }
  });
</script>
