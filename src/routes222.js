import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'

let routes = [
    {
        path:'/login',
        component: 'Login',
        name: '',
        hidden: true
    },
    {
        path:'/',
        component: 'Home',
        name: '',
        hidden: true
    }
]

export default routes;
