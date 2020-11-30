import axios from 'axios';

export default {
    namespaced: true,
    state() {
        return {
            products: []
        }
    },
    mutations: {
        SET_PRODUCT (state, product) {
            state.products = product
        }
    },
    actions: {
        GET_PRODUCTS (context) {
            const http = context.rootState.http.man;
            axios.get(http, {
            })
                .then(response => response.data)
                .then(product => {
                    context.commit('SET_PRODUCT', product);
                })
        }
    },
    getters: {
        products(state) {
            return state.products.reverse();
        }
    }
};