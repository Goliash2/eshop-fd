import { createStore } from 'vuex';

import usersModule from './modules/users';
import productsModule from "@/store/modules/products";
import productsManModule from "@/components/pages/ProductListMan";
import productsWomanModule from "@/components/products/ProductItemWoman";

const store = createStore({
    modules: {
        usr: usersModule,
        prods: productsModule,
        man: productsManModule,
        woman: productsWomanModule
    }
});

export default store;