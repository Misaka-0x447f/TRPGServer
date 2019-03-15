<template>
  <div class="root">
    <div class="container">
      <div class="inner-container">
        <dia
          isNetRelated
          :title="e(ns, 'namespaceSelect')"
        >
          {{e(ns, "namespaceSelectPublicNotSupported")}}
          <inp
            :label="e(ns, 'namespaceName')"
          ></inp>
        </dia>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    height: 100%;
  }
  
  .inner-container {
    height: 60%;
    display: flex;
    align-items center;
    justify-content: center;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import dia from "@/components/Dialogs/Simple/index.vue";
  import {say} from "@/utils/i18n";
  import {ns} from "@/interfaces/Online";
  import bu from "@/components/InputField/Button.vue";
  import inp from "@/components/InputField/Input.vue";

  export default Vue.extend({
    name: "Room",
    components: {
      dia,
      bu,
      inp
    },
    data: () => {
      return {
        e: say,
        ns
      };
    }
  });
</script>
