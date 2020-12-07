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
        },
        user(state) {
            return state.user;
        },
        isAdmin(state) {
            return state.user[0].user.role === 'admin' && state.user[0].user.role !== undefined;
        }
    }
};
