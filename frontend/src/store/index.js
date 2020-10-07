import { createStore } from 'vuex';

import usersModule from './modules/users';
import productsModule from "@/store/modules/products";

const store = createStore({
    modules: {
        usr: usersModule,
        prods: productsModule
    }
});

export default store;