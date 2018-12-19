import Vue from "vue";
import Vuex from "vuex";
import {lang} from "@/utils/i18n.ts";
import {Menu, MenuCarrier} from "@/utils/Menu";

Vue.use(Vuex);

export const FiniteStateMachine = new Vuex.Store({
  modules: {
    public: {
      namespaced: true,
      state: {
        language: "zh-CN"
      },
      mutations: {
        setLang(state, payload: lang) {
          state.languate = payload;
        }
      },
      getters: {
        isEastAsian(state) {
          return ["zh-CN"].includes(state.language);
        }
      }
    },
    menu: {
      namespaced: true,
      state: {
        instance: new Menu()
      },
      mutations: {
        constructTab(state, payload: MenuCarrier) {
          state.instance.constructTab(payload);
        },
        destroyTab(state, payload: string[]) {
          state.instance.destroyTab(payload);
        }
      }
    },
    editor: {
      namespaced: true,
      state: {
      },
      mutations: {
      }
    }
  }
});

export default FiniteStateMachine;
