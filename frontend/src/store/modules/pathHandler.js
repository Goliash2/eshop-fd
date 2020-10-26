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
        }
    },
    actions: {
        GET_PATH(context, payload) {
            context.commit('SET_PATH', payload)
        }
    },
    getters: {
        path(state) {
          return state.path;
        }
    }
};