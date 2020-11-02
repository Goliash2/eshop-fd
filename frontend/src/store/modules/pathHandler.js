export default {
    namespaced: true,
    state() {
        return {
            path: '',
            showMenu: true
        };
    },
    mutations: {
        SET_PATH(state, path) {
            state.path = path;
        },
        HIDE_SIDE_MENU(state) {
            state.showMenu = !state.showMenu;
        }
    },
    actions: {
        GET_PATH(context, payload) {
            context.commit('SET_PATH', payload)
        },
        HIDE_MENU(context) {
            context.commit('HIDE_SIDE_MENU')
        }
    },
    getters: {
        path(state) {
          return state.path;
        },
        showMenu(state) {
            return state.showMenu;
        }
    }
};