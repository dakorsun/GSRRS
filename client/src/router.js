import Vue from "vue";
import Router from "vue-router";
import Test from './views/Test';

Vue.use(Router);

const routes = [];

if (process.env.NODE_ENV === 'development') {
    routes.push({
        path: '/test',
        component: Test
    })
}

export default new Router({
    mode: 'history',
    routes
});

