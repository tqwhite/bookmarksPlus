import Vue from "vue";
import Vuex from "vuex";

import mainGrid from "./modules/mainGrid";
import account from "./modules/account";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    mainGrid,
    account
  }
});
