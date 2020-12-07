import { createRouter, createWebHistory } from 'vue-router';

import ProductList from "@/components/pages/ProductList";
import ProductListWoman from "@/components/pages/ProductListWoman";
import ProductListMan from "@/components/pages/ProductListMan";
import SingleProduct from "@/components/pages/SingleProduct";
import Cart from "@/components/pages/Cart";
import Login from "@/components/pages/Login";
import userModule from "@/components/user/user";
import ShippingAndPay from "@/components/cart/ShippingAndPay";
import ContactInfo from "@/components/cart/ContactInfo";
import PurchaseComplete from "@/components/cart/PurchaseComplete";
import CartContent from "@/components/cart/CartContent";
import Orders from "@/components/user/Orders";
import UserInfo from "@/components/user/UserInfo";
import Admin from "@/components/admin/Admin";
import store from "./store/index.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/products' },
        { path: '/products', component: ProductList },
        { path: '/woman', component: ProductListWoman },
        { path: '/man', component: ProductListMan },
        { name: 'product', path: '/product/:productId', component: SingleProduct},
        { path: '/cart', redirect:'/cart/content', component: Cart, children: [
                { path: '/cart/content', component: CartContent, meta: {content: true} },
                { path: '/cart/shipping', component: ShippingAndPay, meta: {shipping: true} },
                { path: '/cart/contact', component: ContactInfo,  meta: {contact: true} },
                { path: '/cart/purchased', component: PurchaseComplete, meta: {purchased: true} }
            ] },
        { path: '/login', component: Login, meta: { requiresUnauth: true } },
       /* { path: '/register', component: Registration, meta: { requiresUnauth: true } },*/
        { path: '/user', redirect:'/user/orders', component: userModule, meta: { requiresAuth: true }, children: [
                { path: '/user/orders', component: Orders, meta: { requiresAuth: true }},
                { path: '/user/settings', component: UserInfo,  meta: { requiresAuth: true }},
            ] },
        { path:'/admin', component: Admin, meta: { requiresAdmin: true }},
        { path: '/:notFound(.*)', redirect: '/products' }
    ]
});

router.beforeEach(function(to, _, next) {
    if (to.meta.requiresAuth && !store.getters["user/isAuthenticated"]) {
        next('/login');
    } else if (to.meta.requiresUnauth && store.getters["user/isAuthenticated"]) {
        next('/user/orders');
    } else {
        next();
    }
});

router.beforeEach(function (to, _, next) {
    if (to.meta.requiresAdmin && !store.getters["user/isAuthenticated"]) {
        next('/login')
    } else if (to.meta.requiresAdmin && !store.getters["user/isAdmin"]) {
        next('/user/orders');
    } else {
        next();
    }
});

router.beforeEach(function(to, from, next) {
    if (to.meta.shipping && !store.getters["stages/content"]) {
        next('/cart/content');
    } else if (to.meta.contact && !store.getters["stages/shipping"]) {
        next('/cart/shipping');
    } else if (to.meta.purchased && !store.getters["stages/contact"]) {
        next('/cart/contact');
    } else if (to.meta.contact && store.getters["stages/contact"] && from.meta.purchased || to.meta.shipping && store.getters["stages/shipping"] && from.meta.purchased  || to.meta.content && store.getters["stages/content"] && from.meta.purchased ) {
        next('/cart/purchased');
    } else {
        next();
    }
});

export default router;