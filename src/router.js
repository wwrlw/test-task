import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "@/store";

Vue.use(VueRouter);

import AuthPage from '@/pages/AuthPage.vue';
import RequestList from "@/pages/RequestList.vue";

const routes = [
    {
        path: '/login',
        name: 'Auth',
        component: AuthPage
    },
    {
        path: '/',
        name: 'RequestList',
        component: RequestList,
        meta: { requiresAuth: true }
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});


router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated;
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});


export default router;
