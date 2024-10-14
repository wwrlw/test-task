import Vue from 'vue';
import VueRouter from 'vue-router';

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



export default router;
