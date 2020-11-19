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
        addToCart(state, payload) {
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
                    sizes: productData.sizes,
                    qty: 1
                };
                state.items.push(newItem);
            }
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

        increaseItem(state, payload) {
            const prodId = payload;
            const productInCartIndex = state.items.findIndex(
                (cartItem) => cartItem.productId === prodId.id && cartItem.size === prodId.size
            );
            const productSizes = prodId.sizes;
            const findSize = productSizes.find(
                size => size.name === prodId.size
            );
            const cartLimit = findSize.stock;
            const prodData = state.items[productInCartIndex];
            if (state.items[productInCartIndex].qty >= cartLimit) {
                state.items[productInCartIndex].qty = cartLimit;
            } else {
                prodData.qty++;
                state.qty++;
                state.total += prodData.price;
            }
        },
        decreaseItem(state, payload) {
            const prodId = payload;
            const productInCartIndex = state.items.findIndex(
                (cartItem) => cartItem.productId === prodId.id && cartItem.size === prodId.size
            );
            const prodData = state.items[productInCartIndex];
            if (state.items[productInCartIndex].qty <= 1) {
                state.items[productInCartIndex].qty = 1;
            } else {
                prodData.qty--;
                state.qty--;
                state.total -= prodData.price;
            }
        },
    },
    actions: {

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