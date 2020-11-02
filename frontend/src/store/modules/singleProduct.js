import axios from 'axios';

export default {
    namespaced: true,
    state() {
        return {
            product: [],
        }
    },
    mutations: {
        SET_PRODUCT (state, foundProduct) {
            state.product = foundProduct;
        }
    },
    actions: {
        GET_PRODUCT (context, payload) {
            const productId = payload.id;
            const http = context.rootState.http.singleProduct;
            axios.get(http + productId, {
            })
                .then(response => response.data)
                .then(product => {
                    const foundProduct = [];
                    foundProduct.push(product);
                    context.commit('SET_PRODUCT', foundProduct);
                })
        }
    },
    getters: {
        product(state) {
            return state.product;
        }
    }
};
