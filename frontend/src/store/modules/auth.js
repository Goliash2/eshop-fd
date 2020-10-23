import axios from 'axios';
import jwt_decode from "jwt-decode";

export default {
    namespaced: true,
    state() {
        return {
            status: null,
            error: false
        }
    },
    mutations: {
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
        async login(context, payload) {
            axios.post('http://127.0.0.1:3000/user/login', {
                email: payload.email,
                password: payload.password
            })
                .then(function (response) {
                    const tokenResponse = Object.values(response.data);
                    const token = tokenResponse[0];
                    const tokenPayload = jwt_decode(token);
                    const userState = context.rootState.user;
                    userState.user[0] = tokenPayload;
                    userState.token = token;
                    context.commit('getStatus', response.status);
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
        }
    }
}