import Vue from "vue";
import Vuex from "vuex";
import {lang} from "@/utils/i18n.ts";

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
    }
  }
});

export default FiniteStateMachine;
