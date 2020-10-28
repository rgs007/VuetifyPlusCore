import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import Vuex from 'vuex';
import './plugins/axios';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import { auth } from './store/auth.module';
import store from '@/store/index';
import './registerServiceWorker';
import dateFilter from '@/filters/date.filter';
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false;

export default new Vuex.Store({
    modules: {
        auth
    }
});

Vue.use(VeeValidate);
Vue.use(Vuex);

Vue.filter('date', dateFilter);
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});
new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');


