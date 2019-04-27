<template>
  <div class="root">
    <div class="container">
      <div :class="{'has-title-line': !isUndefined(title), 'title-line': true}">
        <span>
          <span>
            {{freePoints}}
          </span>
          <span class="small">
            {{e('global', 'remainingPoints')}}
          </span>
        </span>
        <span v-if="!isUndefined(title)" class="title">
          {{title}}
        </span>
      </div>
      <div>
        <div v-for="v in InheritedDef.initialPoint" class="panel-container">
          <div>
            {{v.text}}
          </div>
          <div class="points-container">
            <div
              v-for="i in maxPoints"
              :class="{
                square: true,
                inherited: i <= v.inherited,
                bonus: i > v.inherited && i <= v.inherited + getBonusPointsByLabel(v.label)
              }"
            >
            </div>
          </div>
          <bu @click="() => pointOperate(v, true)" :enabled="allocateEnabled" inline>
            <font-awesome-icon :icon="ico.caretUp"></font-awesome-icon>
          </bu>
          <bu @click="() => pointOperate(v, false)" :enabled="freeEnabled(v)" inline>
            <font-awesome-icon :icon="ico.caretDown"></font-awesome-icon>
          </bu>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .container {
    display: flex;
    flex-direction: column;
  }

  .title-line {
    display: flex;
    justify-content: space-between;
  }

  .small {
    font-size: 0.8em;
  }

  .title {
    margin: 0.2em 0;
  }

  .small, .title {
    color: plain-text-0-weak;
  }

  .has-title-line {
    border-bottom: underline-0;
  }

  .panel-container {
    display: flex;
    align-items: center;
  }

  .points-container {
    margin: 0 0.5em;
    display: flex;
    align-items: center;
  }

  .square {
    width: 2em;
    height: 0.6em;
    margin: 0 1px;
    background-color: slot-point;
  }

  .square.inherited {
    background-color: inherited-point;
  }

  .square.bonus {
    background-color: bonus-point;
  }
</style>
<script lang="ts">
  import Vue from "vue";
  import {find, findIndex, isUndefined, max, maxBy, remove} from "lodash";
  import bu from "./Button.vue";
  import {ico} from "@/utils/FontAwesome";
  import {say} from "@/utils/i18n";
  import {InitialPointDef, PointDef} from "@/components/InputField/BonusPoint";
  
  interface BonusStore {
    label: string;
    points: number;
  }

  export default Vue.extend({
    name: "BonusPoint",
    components: {
      bu
    },
    props: {
      InheritedDef: {
        type: Object as () => PointDef
      },
      title: {
        type: String,
        default: undefined
      },
      minSlots: {
        type: Number,
        default: 0
      }
    },
    data: () => {
      return {
        store: [] as BonusStore[],
        ico,
        isUndefined,
        e: say
      };
    },
    computed: {
      maxPoints(): number {
        // since it must include definitions, it must has a max element.
        const maxPredefinePoints = maxBy(this.InheritedDef.initialPoint, (o) => {
          return o.inherited;
        }) as InitialPointDef;

        return max([
          maxPredefinePoints.inherited + this.InheritedDef.freePoint.totalFree,
          this.minSlots
        ]) as number;
      },
      freePoints(): number {
        // get total number of allocated points
        let sum = 0;
        for (const v of this.store) {
          sum += v.points;
        }

        return this.InheritedDef.freePoint.totalFree - sum;
      },
      allocateEnabled(): boolean {
        return this.freePoints > 0;
      }
    },
    watch: {
      InheritedDef() {
        this.useCallback();
      }
    },
    methods: {
      getBonusPointsByLabel(label: string) {
        const obj = find(this.store, (o) => {
          return o.label === label;
        }) as undefined | BonusStore;
        if (isUndefined(obj)) {
          return 0;
        } else {
          return obj.points;
        }
      },
      freeEnabled(which: InitialPointDef) {
        // search for this one...
        const obj = find(this.store, (o) => {
          return o.label === which.label;
        }) as undefined | BonusStore;
        if (isUndefined(obj) || obj.points === 0) {
          // ok no points has been allocated so you cannot free one.
          return false;
        } else if (obj.points > 0) {
          // you can free one since some points has been allocated...
          return true;
        }
        throw new Error(`Impossible route has been reached due to found: ${JSON.stringify(obj)}`);
      },
      pointOperate(which: InitialPointDef, isIncrease: boolean) {
        // this attr exist in the bonus store? if not, create one.
        if (findIndex(this.store, (o) => {
          return o.label === which.label;
        }) === -1) {
          this.store.push({label: which.label, points: 0});
        }

        // then operate points..
        // also use Vue.set for change tracking...
        const obj = find(this.store, (o) => {
          return o.label === which.label;
        }) as BonusStore;
        if (isIncrease) {
          this.$set(obj, "points", obj.points + 1);
        } else {
          this.$set(obj, "points", obj.points - 1);
        }

        this.useCallback();
      },
      useCallback() {
        // also remember to clean 'bonus-point is 0' item...
        remove(this.store, (o) => {
          return o.points === 0;
        });
        this.$emit("change", {
          common: this.store
        });
      }
    }
  });
</script>
