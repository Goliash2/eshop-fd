import { createRouter, createWebHistory } from 'vue-router';

import ProductList from "@/components/pages/ProductList";
import ProductListWoman from "@/components/pages/ProductListWoman";
import ProductListMan from "@/components/pages/ProductListMan";
import SingleProduct from "@/components/pages/SingleProduct";
import Cart from "@/components/pages/Cart";
import Login from "@/components/pages/Login";
import Registration from "@/components/pages/Registration";
import userModule from "@/components/user/user";
import store from "./store/index.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/products' },
        { path: '/products', component: ProductList },
        { path: '/woman', component: ProductListWoman },
        { path: '/man', component: ProductListMan },
        { name: 'product', path: '/product/:productId', component: SingleProduct},
        { path: '/cart', component: Cart },
        { path: '/login', component: Login, meta: { requiresUnauth: true } },
        { path: '/register', component: Registration, meta: { requiresUnauth: true } },
        { path: '/user', component: userModule, meta: { requiresAuth: true } }
    ]
});

router.beforeEach(function(to, _, next) {
    if (to.meta.requiresAuth && !store.getters["user/isAuthenticated"]) {
        next('/login');
    } else if (to.meta.requiresUnauth && store.getters["user/isAuthenticated"]) {
        next('/user');
    } else {
        next();
    }
});

export default router;