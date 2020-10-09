import { createStore } from 'vuex';

import usersModule from './modules/users';
import productsModule from "@/store/modules/products";
import productsManModule from "@/store/modules/productsMan";
import productsWomanModule from "@/store/modules/productsWoman";
import cartModule from "@/store/modules/cart";

const store = createStore({
    modules: {
        usr: usersModule,
        prods: productsModule,
        man: productsManModule,
        woman: productsWomanModule,
        cart: cartModule
    }
});

export default store;