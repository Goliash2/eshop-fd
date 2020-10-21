import { createStore } from 'vuex';

import usersModule from './modules/users';
import productsModule from "@/store/modules/products";
import productsManModule from "@/store/modules/productsMan";
import productsWomanModule from "@/store/modules/productsWoman";
import cartModule from "@/store/modules/cart";
import singleProduct from "@/store/modules/singleProduct";
import authModule from "@/store/modules/auth";

import createPersistedState from "vuex-persistedstate";

const savedState = createPersistedState({
    paths: ['cart', 'auth']
})

const store = createStore({
    modules: {
        usr: usersModule,
        prods: productsModule,
        man: productsManModule,
        woman: productsWomanModule,
        product: singleProduct,
        cart: cartModule,
        auth: authModule
    },
    plugins: [savedState]
});

export default store;