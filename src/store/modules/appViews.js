const state = {
    viewId: 1
   };
   const getters = {
    getViewId: state => {
     return state.viewId;
    }
   };
   const mutations = {
    setViewId: (state, payload) => {
     state.viewId++;
    }
   };
   const actions = {
    setViewId: (context, payload) => {
     context.commit("setViewId", payload);
    }
   };
   export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
   };