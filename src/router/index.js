import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/views/404'
import Home from '@/views/Home'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Test from '@/components/Test'
import TestResult from '@/components/TestResult'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes:[
        {
          path: '/404',
          name: 'NotFound',
          component: NotFound,
          meta: {title: '错误页面'}
        },
        {
          path: '/',
          name: 'Home',
          component: Home,
          meta: {title: '智能合约检测平台首页'}

          // children: [
          //   {path: 'Test', name: 'Test', component: Test},
          // ]
        },
        {
          path: '/Login',
          name: 'Login',
          component: Login,
          meta: {title: '智能合约检测平台登录页面'}
        },
        {
          path: '/Register',
          name: 'Register',
          component: Register,
          meta: {title: '智能合约检测平台注册页面'}
        },
        {
          path: '/Test',
          name: 'Test',
          component: Test,
          meta: {title: '智能合约检测'}
        },
        {
          path: '/TestResult',
          name: 'TestResult',
          component: TestResult,
          meta: {title: '智能合约检测结果'}
        }
    ]
})


