import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes:[
        {
          path: '/',
          name: 'Home',
          component: Home
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
        }
    ]
})


