import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from './src/pages/Login';

Vue.use(VueRouter);

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
    path: '*',
    redirect: '/login'
}]

const router = new VueRouter({
    routes
});

applicationCache.addEventListener('updateready', function () {
    applicationCache.swapCache();
    location.reload();
}, true);

new Vue({
    router
}).$mount('#app');