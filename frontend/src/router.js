import { createRouter, createWebHistory } from 'vue-router';

import ProductList from "@/components/pages/ProductList";
import ProductListWoman from "@/components/pages/ProductListWoman";
import ProductListMan from "@/components/pages/ProductListMan";
import SingleProduct from "@/components/pages/SingleProduct";
import Cart from "@/components/pages/Cart";
import Login from "@/components/pages/Login";
import Registration from "@/components/pages/Registration";
import userModule from "@/components/user/user";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/products' },
        { path: '/products', component: ProductList },
        { path: '/woman', component: ProductListWoman },
        { path: '/man', component: ProductListMan },
        { name: 'product', path: '/product/:productId', component: SingleProduct},
        { path: '/cart', component: Cart },
        { path: '/login', component: Login },
        { path: '/register', component: Registration },
        { path: '/user', component: userModule }
    ]
});

export default router;