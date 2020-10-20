import axios from 'axios';

export default {
    namespaced: true,
    state() {
        return {
            status: null
        }
    },
    mutations: {
        getStatus(state, status) {
            state.status = status;
        },
        removeStatus(state) {
            state.status = null;
        }
    },
    actions: {
        login() {

        },
        register(context, payload) {
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
        }
    },
    getters: {
        status(state) {
            return state.status;
        }
    }
}