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
    actions: {
       show(context) {
           context.commit('SHOW_MENU');
       },
        close(context) {
            context.commit('CLOSE_MENU');
        },
    },
    getters: {
        show(state) {
            return state.showMenu;
        }
    }
};