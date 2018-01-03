import Vue from 'vue';
import VueRouter from 'vue-router';

import Remote from './src/plugins/remote';

import Login from './src/pages/Login';
import Dashboard from './src/pages/Dashboard';

import registComponent from './src/components';

Vue.use(VueRouter);
Vue.use(Remote);

registComponent(Vue);

const __svg__ = {
    path: './src/assets/svg/*.svg',
    name: 'assets/svg/p-svg.svg'
}

require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);

const routes = [{
    name: 'Login',
    path: '/login',
    component: Login
}, {
    name: 'Dashboard',
    path: '/dashboard',
    component: Dashboard
}, {
    path: '*',
    redirect: '/login'
}]

const router = new VueRouter({
    routes
});

new Vue({
    router
}).$mount('#app');