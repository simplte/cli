import Vue from "vue";
import Vuex from "vuex";
import readBuy from "./modules/readBuy";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    readBuy
  }
});
