import Vue from 'vue'
import Router from 'vue-router'
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
          path: '/',
          name: 'Home',
          component: Home
          // children: [
          //   {path: 'Test', name: 'Test', component: Test},
          // ]
        },
        {
          path: '/Login',
          name: 'Login',
          component: Login
        },
        {
          path: '/Register',
          name: 'Register',
          component: Register
        },
        {
          path: '/Test',
          name: 'Test',
          component: Test
        },
        {
          path: '/TestResult',
          name: 'TestResult',
          component: TestResult
        }
    ]
})


