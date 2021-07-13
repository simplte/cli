const state = {
  test: "222",

};
const mutations = {
  test(state, val) {
    state.test = val;
  },
 
};
const actions = {
  test(context, val) {
    context.commit("test", val);
  },
 
};
const getters = {};

export default {
  state,
  actions,
  getters,
  mutations
};
