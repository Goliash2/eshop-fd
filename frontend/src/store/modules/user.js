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
        },
        token_exp(state) {
            if (Date.now() >= state.user[0].exp * 1000) {
                state.user = []
                state.token = null
            }
        }
    },
    actions: {
        logout(context) {
            context.commit('user_logout');
        },
        checkTokenExp(context) {
            context.commit('token_exp');
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
