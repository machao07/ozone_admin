// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import canvas from '../static/js/canvas.js'
import animate from 'animate.css'
import VueRouter from 'vue-router'
import '../static/css/common.css'
import VueModal from 'vue-js-modal'
import i18n from './i18n/i18n'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs';

Vue.use(ElementUI)
Vue.use(ElementUI, { locale })
Vue.use(canvas)
Vue.use(animate)
Vue.use(VueModal)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.prototype.$qs = qs;

axios.defaults.withCredentials = true
Vue.config.productionTip = false

// const router = new VueRouter({
//     routes
// })

// let router = VueRouter({
//     mode: 'history',
//     routes: routes
// });

//全局路由守卫
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.isLogin)) { // 判断该路由是否需要登录权限
        console.log(sessionStorage.getItem('islogin'));
        if (sessionStorage.getItem('islogin') == 0) {
            next();
        } else {
            next('/login')
        }
    } else {
        next();
    }
});


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    components: { App },
    template: '<App/>'
})