import axios from 'axios';

export default {
    namespaced: true,
    state() {
        return {
            status: null,
            token: null,
            error: false
        }
    },
    mutations: {
        getStatus(state, status) {
            state.status = status;
        },
        removeStatus(state) {
            state.status = null;
        },
        removeError(state) {
            state.error = false;
        },
        getToken(state, token) {
            state.token = token;
            console.log(token);
        },
        getError(state, error) {
            state.error = error;
        }
    },
    actions: {
        async login(context, payload) {
            axios.post('http://127.0.0.1:3000/user/login', {
                email: payload.email,
                password: payload.password
            })
                .then(function (response) {
                    context.commit('getStatus', response.status);
                    context.commit('getToken', Object.values(response.data));
                })
                .catch(error => {
                    if (error.response) {
                        context.commit('getError', true)
                    }
                })
        },
        async register(context, payload) {
            axios.post('http://127.0.0.1:3000/user', {
                name: payload.name,
                username: payload.username,
                email: payload.email,
                password: payload.password
            })
                .then(function (response) {
                    context.commit('getStatus', response.status);
                })
        },
        removeStatus(context) {
            context.commit('removeStatus')
        },
        removeError(context) {
            context.commit('removeError')
        }
    },
    getters: {
        status(state) {
            return state.status;
        },
        error(state) {
            return state.error;
        },
        token(state) {
            return state.token;
        }
    }
}