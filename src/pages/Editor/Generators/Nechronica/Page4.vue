<template>
  <div class="root">
    <div class="container">
      <div>
        <names>
          {{e(ns, "equips")}}
        </names>
        <div class="hint">
          {{e(ns, "equipsDesc")}}
        </div>
        <div class="hint">
          {{e(ns, "techLevelDesc")}}
        </div>
      </div>
      <div class="equips">
        <div>
          <names>
            {{e(ns, "arms")}}
          </names>
          <eq
            :backpack="s.arms"
            :inventory="armsInv"
            :slotsDef="maxSlots['arms']"
            :callback="callbacks"
          >
          </eq>
        </div>
        <div>
          <names>
            {{e(ns, "evolve")}}
          </names>
          <eq
            :backpack="s.evolve"
            :inventory="evolveInv"
            :slotsDef="maxSlots['evolve']"
            :callback="callbacks"
          >
          </eq>
        </div>
        <div>
          <names>
            {{e(ns, "modify")}}
          </names>
          <eq
            :backpack="s.modify"
            :inventory="modifyInv"
            :slotsDef="maxSlots['modify']"
            :callback="callbacks"
          >
          </eq>
        </div>
      </div>
      <div class="collections">
        <ch
          @page="collectionChanged"
          :title="e(ns, 'collections')"
          :items="e(ns, 'builtInCollections')"
        ></ch>
        <txt :label="e(ns, 'customCollections')" :callback="customCollectionsInput"
             v-model="customCollections.title"></txt>
        <txt :label="e(ns, 'customCollectionsDesc')" :callback="customCollectionsInput"
             v-model="customCollections.desc"></txt>
        <div class="hint">
          {{e(ns, "collectionsDesc")}}
        </div>
      </div>
      <div class="defaultLocation">
        <ch
          @page="locationChanged"
          :title="e(ns, 'defaultLocation')"
          :items="e(ns, 'location').slice(2)"
        ></ch>
        <div class="hint">
          {{e(ns, "defaultLocationDesc")}}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .equips {
    display: flex;
  }

  .equips > div {
    flex: 1;
  }

  .equips > div:not(:last-child) {
    margin-right: 0.5em;
  }

  .hint {
    color: plain-text-0-hints;
    margin: 0.5em 0;
  }

  .collections, .defaultLocation {
    margin-top: 2em;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {say} from "@/utils/i18n";
  import {CustomCollections, ns} from "@/interfaces/Nechronica";
  import names from "@/components/propTitle.vue";
  import eq from "@/components/InputField/EquipModify/index.vue";
  import {cloneDeep} from "lodash";
  import {computed, computedProxy, s, storageProxy} from "@/pages/Editor/Generators/Nechronica/SharedStorage";
  import ch, {Choices} from "@/components/InputField/SelectItem.vue";
  import txt from "@/components/InputField/Input.vue";
  import {getHashByString} from "@/utils/math";

  export default Vue.extend({
    name: "Page4",
    components: {
      names,
      eq,
      ch,
      txt
    },
    data() {
      return {
        e: say,
        ns,
        armsInv: cloneDeep(say(ns, "builtInArms")),
        evolveInv: cloneDeep(say(ns, "builtInEvolve")),
        modifyInv: cloneDeep(say(ns, "builtInModify")),
        maxSlots: {
          arms: [0, 0, 0],
          evolve: [0, 0, 0],
          modify: [0, 0, 0]
        },
        customCollections: {
          label: "",
          title: "",
          desc: ""
        },
        s
      };
    },
    mounted() {
      const updateSlots = () => {
        this.maxSlots = cloneDeep(computed);
      };
      computedProxy.registerTrigger(updateSlots);
    },
    methods: {
      collectionChanged(e: Choices) {
        this.customCollections.title = e.title;
        this.customCollections.desc = e.desc;
        s.collections = [e] as CustomCollections[];
      },
      locationChanged(e: Choices) {
        s.defaultLocation = e.label;
      },
      customCollectionsInput() {
        this.customCollections.label = getHashByString(this.customCollections.title);
        s.collections = [cloneDeep(this.customCollections)];
      },
      callbacks() {
        storageProxy.triggerAll();
      }
    }
  });
</script>
