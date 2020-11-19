export default {
    namespaced: true,
    state() {
        return {
            path: ''
        };
    },
    mutations: {
        SET_PATH(state, path) {
            state.path = path;
        },
    },
    actions: {

    },
    getters: {
        path(state) {
          return state.path;
        }
    }
};