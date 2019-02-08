<template>
  <div class="root">
    <div class="container">
      <div class="hint">
        {{e(ns, "lastStep")}}
      </div>
      <ch
        @page="collectionUpdate"
        :title="collectionName"
        :items="soc"
        v-if="s.collections.length > 0"
      ></ch>
      <div v-else class="invalid">
        {{e("global", "invalid")}}
      </div>
      <div class="hint">
        {{e(ns, "wizardDone")}}
      </div>
      <div class="hint">
        {{e(ns, "finishTip")}}
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .hint {
    color: plain-text-0-hints;
    margin: 0.5em 0;
  }
  
  .invalid {
    color: invalid;
    font-size: 1.2em;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {say} from "@/utils/i18n";
  import {ns} from "@/interfaces/Nechronica";
  import ch, {Choices} from "@/components/InputField/SelectItem.vue";
  import {s, storageProxy} from "@/pages/Editor/Generators/Nechronica/SharedStorage";
  import {Socket} from "@/interfaces/Nechronica/Equips";
  import {getCollectionByLabel} from "@/utils/Nechronica";

  export default Vue.extend({
    name: "Page5",
    components: {
      ch
    },
    data: () => {
      return {
        e: say,
        ns,
        collectionLabel: "",
        collectionName: "",
        s
      };
    },
    computed: {
      soc() {
        const a = say(ns, "builtInSocket");
        return [
          {
            label: Socket.head,
            title: a[Socket.head]
          },
          {
            label: Socket.body,
            title: a[Socket.body]
          },
          {
            label: Socket.hand,
            title: a[Socket.hand]
          },
          {
            label: Socket.leg,
            title: a[Socket.leg]
          }
        ];
      }
    },
    mounted() {
      const updateListener = () => {
        if (s.collections.hasOwnProperty(0)) {
          this.collectionLabel = s.collections[0].label;
          this.collectionName = getCollectionByLabel(s.collections, this.collectionLabel).title as string;
        }
      };
      storageProxy.registerTrigger(updateListener);
    },
    methods: {
      collectionUpdate(e: Choices) {
        s.collectionsSocket = [{
          label: this.collectionLabel,
          socket: e.label as Socket
        }];
      }
    }
  });
</script>
