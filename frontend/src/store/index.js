import { createStore } from 'vuex';

import usersModule from './modules/users';
import productsModule from "@/store/modules/products";
import productsManModule from "@/store/modules/productsMan";
import productsWomanModule from "@/store/modules/productsWoman";
import cartModule from "@/store/modules/cart";
import singleProduct from "@/store/modules/singleProduct";
import authModule from "@/store/modules/auth";
import userModule from "@/store/modules/user";
import adminModule from "@/store/modules/admin";
import pathHandler from "@/store/modules/pathHandler";
import httpPaths from "@/store/modules/httpPaths";
import sidebarHandler from "@/store/modules/sidebarHandler";
import cartStages from "@/store/modules/cartStages";

import createPersistedState from "vuex-persistedstate";

const savedState = createPersistedState({
    paths: ['cart', 'user', 'stages']
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
        admin: adminModule,
        path: pathHandler,
        http: httpPaths,
        sidebarHandler: sidebarHandler,
        stages: cartStages
    },
    plugins: [savedState]
});

export default store;