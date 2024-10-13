import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import AuthComponent from "@/components/AuthComponent.vue";
export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Auth',
            component: AuthComponent,
        }
    ]
})