export default {
    namespaced: true,
    state() {
        return {
            showMenu: false
        };
    },
    mutations: {
      SHOW_MENU(state) {
          state.showMenu = true;
      },
        CLOSE_MENU(state) {
          state.showMenu = false;
        }
    },
    getters: {
        show(state) {
            return state.showMenu;
        }
    }
};