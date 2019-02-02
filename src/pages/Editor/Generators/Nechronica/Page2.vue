<template>
  <div class="root">
    <div class="container">
      <div>
        {{e("nechronicaDataGenCharacterName")}}
      </div>
      <txt v-model="nameInput" :placeholder="tempName"></txt>
      <div>
        {{e("nechronicaDataGenCharacterAge")}}
      </div>
      <txt v-model="ageInput" :placeholder="tempAge"></txt>
      <div>
        {{e("nechronicaDataGenCharacterDesc")}}
      </div>
      <txt v-model="descInput"></txt>
      <div>
        {{e("nechronicaDataGenSkipStep2")}}
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {

  }
</style>
<script lang="ts">
  import Vue from "vue";
  import say from "@/utils/i18n";
  import {getRandomName} from "@/utils/math";
  import txt from "@/pages/_public/InputField/Input.vue";
  import state from "@/utils/state";
  import {random} from "lodash";
  import {updateProperty} from "@/utils/PropertyEditor";
  import {isNumeric} from "@/utils/lang";

  export default Vue.extend({
    name: "NecPage2",
    components: {
      txt
    },
    data: () => {
      return {
        e: say,
        state,
        nameInput: "",
        ageInput: "",
        descInput: ""
      };
    },
    computed: {
      tempName() {
        return getRandomName();
      },
      tempAge() {
        return random(8, 17).toString();
      }
    },
    mounted() {
      this.nameInput = this.tempName;
      this.ageInput = this.tempAge;
    },
    watch: {
      nameInput() {
        if (this.nameInput === "") {
          updateProperty("name", this.tempName);
        } else {
          updateProperty("name", this.nameInput);
        }
      },
      ageInput() {
        if (isNumeric(this.ageInput)) {
          updateProperty("age", this.ageInput);
        } else {
          updateProperty("age", this.tempAge);
        }
      },
      descInput() {
        updateProperty("desc", this.descInput);
      }
    }
  });
</script>
