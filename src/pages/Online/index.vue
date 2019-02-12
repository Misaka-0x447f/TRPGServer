<template>
  <div class="root">
    <div class="container">
      <user v-if="page === 'register'"></user>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {

  }
</style>
<script lang="ts">
  import Vue from "vue";
  import user from "./RegisterUser.vue";

  export default Vue.extend({
    name: "OnlineIndex",
    components: {
      user
    },
    data: () => {
      return {
        page: "register"
      };
    }
  });
</script>
