import axios from 'axios';
export default {
    namespaced: true,
    state() {
        return {
            user: [],
            token: null,
            status: null,
            error: false
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
        },
        updateUserState(state, newInfo) {
            state.user[0].user = newInfo
        },
        getStatus(state, status) {
            state.status = status;
        },
        getError(state, error) {
            state.error = error;
        },
        removeStatus(state) {
            state.status = null;
        },
        removeError(state) {
            state.error = false;
        },
    },
    actions: {
        updateUser(context, payload) {
            const http = context.rootState.http.editUser;
            axios.patch(http + payload.userId, {
                address: payload.address,
                phone: payload.phone
            },
                {
                    headers: {
                        'Authorization': 'Bearer ' + payload.token
                    }
                })
                .then(response => {
                    context.commit('updateUserState', response.data);
                    context.commit('getStatus', response.status);
                })
                .catch(error => {
                    if (error.response) {
                        context.commit('getError', true)
                    }
                })
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
        },
        user(state) {
            return state.user;
        },
        isAdmin(state) {
            return state.user[0].user.role === 'admin' && state.user[0].user.role !== undefined;
        },
        token(state) {
            return state.token;
        },
        status(state) {
            return state.status;
        },
        error(state) {
            return state.error;
        }
    }
};
