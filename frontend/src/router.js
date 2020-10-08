import { createRouter, createWebHistory } from 'vue-router';

import ProductList from "@/components/pages/ProductList";
import ProductListWoman from "@/components/pages/ProductListWoman";
import ProductListMan from "@/components/pages/ProductListMan";
import Cart from "@/components/pages/Cart";
import Login from "@/components/pages/Login";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/products' },
        { path: '/products', component: ProductList },
        { path: '/woman', component: ProductListWoman },
        { path: '/man', component: ProductListMan },
        { path: '/cart', component: Cart },
        { path: '/login', component: Login },
    ]
});

export default router;