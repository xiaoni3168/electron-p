import Vue from 'vue';
import VueRouter from 'vue-router';
import MuseUI from 'muse-ui';

import Login from './src/pages/Login';
import Bill from './src/pages/Bill';

import 'muse-ui/dist/muse-ui.css';

Vue.use(VueRouter);
Vue.use(MuseUI);

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
    name: 'Bill',
    path: '/bill',
    component: Bill
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