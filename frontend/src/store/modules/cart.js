export default {
    namespaced: true,
    state() {
        return {
            items: [],
            total: 0,
            qty: 0
        };
    },
    mutations: {
        addProductToCart(state, payload) {
            const productData = payload;
            const productInCartIndex = state.items.findIndex(
                (cartIndex) => cartIndex.productId === productData.id && cartIndex.size === productData.size
            );
            const productSizes = productData.sizes;
            const findSize = productSizes.find(
                size => size.name === productData.size
            );
            const cartLimit = findSize.stock;
            if (productInCartIndex >= 0) {
                state.items[productInCartIndex].qty++;
            } else {
                const newItem = {
                    productId: productData.id,
                    name: productData.name,
                    image: productData.image,
                    price: productData.price,
                    size: productData.size,
                    qty: 1
                };
                console.log(newItem);
                state.items.push(newItem);
            }
            console.log(productInCartIndex);
            if (productInCartIndex >= 0) {
                if (state.items[productInCartIndex].qty > cartLimit) {
                    state.items[productInCartIndex].qty = cartLimit;
                } else {
                    state.qty++;
                    state.total += productData.price;
                }
            } else {
                state.qty++;
                state.total += productData.price;
            }
        },

        removeProductFromCart(state, payload) {
            const prodId = payload;
            const productInCartIndex = state.items.findIndex(
                (cartItem) => cartItem.productId === prodId.id && cartItem.size === prodId.size
            );
            const prodData = state.items[productInCartIndex];
            state.items.splice(productInCartIndex, 1);
            state.qty -= prodData.qty;
            state.total -= prodData.price * prodData.qty;
        },
    },
    actions: {
        addToCart(context, payload) {
            context.commit('addProductToCart', payload);
        },
        removeFromCart(context, payload) {
            context.commit('removeProductFromCart', payload);
        }
    },
    getters: {
        products(state) {
            return state.items;
        },
        totalSum(state) {
            return state.total;
        },
        quantity(state) {
            return state.qty;
        }
    }
};