const state = {
    viewId: 1,
    keepAlivePage: []
};
const getters = {
    getViewId: state => {
        return state.viewId;
    }
};
const mutations = {
    setViewId: (state, payload) => {
        state.viewId++;
    },
    ADD_KEEP_ALVE: (state, name) => {
        state.keepAlivePage = state.keepAlivePage.concat(name)
    },
    CHANGE_KEEP_ALIVE: (state, name) => {
        const keepAlivePage = state.keepAlivePage
        const index = keepAlivePage.indexOf(name)
        if (index > -1) {
            keepAlivePage.splice(index, 1)
        }
    }
};
const actions = {
    setViewId: (context, payload) => {
        context.commit("setViewId", payload);
    },
    addKeepAlivePage({ commit }, name) {
        commit('ADD_KEEP_ALVE', name)
    },
    changeKeepAlive({ commit }, name) {
        commit('CHANGE_KEEP_ALIVE', name)
    }
};
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};