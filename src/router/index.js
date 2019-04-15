import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/views/404'
import Home from '@/views/Home'
// import Header from '@/components/Header'
// import Language from '@/components/Language'
// import Footer from '@/components/Footer'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Password from '@/views/Password'
// import HomeContent from '@/components/HomeContent'
import Test from '@/components/Test'
import TestResult from '@/components/TestResult'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/404',
            name: 'NotFound',
            component: NotFound,
            meta: { title: '错误页面' }
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
            // 显示首页内容
            meta: {
                index: 0,
                showHomecontent: true
            }
        },
        {
            path: '/Home',
            name: 'Home',
            component: Home,
            // 显示首页内容
            meta: {
                index: 0,
                showHomecontent: true
            }
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login,
            meta: { title: '智能合约检测平台登录页面' }
        },
        {
            path: '/Register',
            name: 'Register',
            component: Register,
            meta: { title: '智能合约检测平台注册页面' }
        },
        {
            path: '/Password',
            name: 'Password',
            component: Password,
            meta: { title: '智能合约检测平台修改密码' }
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
            // 不显示首页内容
            meta: {
                index: 1,
                showHomecontent: false
            },
            children: [{
                path: '/Test',
                component: Test,
                name: 'Test'
                    // children: [
                    //   {path:'/TestResult', component: TestResult, name: 'TestResult'}
                    // ]
            }]
        },
        {
            path: '/TestResult',
            name: 'TestResult',
            component: TestResult
        }
    ]
})