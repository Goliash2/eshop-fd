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
            console.log(productId);
            axios.get('http://127.0.0.1:3000/product', {
            })
                .then(response => response.data)
                .then(product => {
                    const foundProduct = product.filter(item =>
                        item._id === productId
                    );
                    console.log(foundProduct);
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
