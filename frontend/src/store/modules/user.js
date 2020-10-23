export default {
    namespaced: true,
    state() {
        return {
            user: [],
            token: null
        }
    },
    mutations: {
        user_logout(state) {
            state.user = []
            state.token = null
        }
    },
    actions: {
        logout(context) {
            context.commit('user_logout');
        }
    },
    getters: {
        userInfo(state) {
            return state.user[0].user;
        },
        isAuthenticated(state) {
            return !!state.token;
        },
        username(state) {
            return state.user[0].user.username;
        }
    }
};
