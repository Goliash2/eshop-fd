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
            axios.get('http://127.0.0.1:3000/product/man', {
            })
                .then(response => response.data)
                .then(product => {
                    console.log(product);
                    context.commit('SET_PRODUCT', product);
                })
        }
    },
    getters: {
        products(state) {
            return state.products;
        }
    }
};