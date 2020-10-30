import { createStore } from 'vuex';

import usersModule from './modules/users';
import productsModule from "@/store/modules/products";
import productsManModule from "@/store/modules/productsMan";
import productsWomanModule from "@/store/modules/productsWoman";
import cartModule from "@/store/modules/cart";
import singleProduct from "@/store/modules/singleProduct";
import authModule from "@/store/modules/auth";
import userModule from "@/store/modules/user";
import pathHandler from "@/store/modules/pathHandler";
import httpPaths from "@/store/modules/httpPaths";
import booleanGuard from "@/store/modules/booleanGuard";

import createPersistedState from "vuex-persistedstate";

const savedState = createPersistedState({
    paths: ['cart', 'user']
})

const store = createStore({
    modules: {
        usr: usersModule,
        prods: productsModule,
        man: productsManModule,
        woman: productsWomanModule,
        product: singleProduct,
        cart: cartModule,
        auth: authModule,
        user: userModule,
        path: pathHandler,
        http: httpPaths,
        guard: booleanGuard
    },
    plugins: [savedState]
});

export default store;