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
      <div v-for="v in equipsToBeSet">
        <ch
          @page="(e) => {equipsUpdate(e, v.label)}"
          :title="v.text"
          :items="soc"
          @equipSlotChanged="storageProxy.triggerAll()"
        >
        </ch>
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
  import {EquipText, Socket} from "@/interfaces/Nechronica/Equips";
  import {getCollectionByLabel, getEquipsToBeSet} from "@/utils/Nechronica";
  import {findIndex} from "lodash";

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
        equipsToBeSet: [] as EquipText[],
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
      },

    },
    mounted() {
      const updateListener = () => {
        if (s.collections.hasOwnProperty(0)) {
          this.collectionLabel = s.collections[0].label;
          this.collectionName = getCollectionByLabel(s.collections, this.collectionLabel).title as string;
        }
        this.equipsToBeSet = getEquipsToBeSet();
      };
      storageProxy.registerTrigger(updateListener);
    },
    methods: {
      collectionUpdate(e: Choices) {
        s.collectionsSocket = [{
          label: this.collectionLabel,
          socket: e.label as Socket
        }];
      },
      equipsUpdate(e: Choices, l: string) {
        const i = findIndex(s.equipsSocket, {label: l});
        const n = {label: l, socket: e.label as Socket};
        if (i >= 0) {
          s.equipsSocket.splice(i, 1, n);
        } else {
          s.equipsSocket.push(n);
        }
        storageProxy.triggerAll();
      }
    }
  });
</script>
