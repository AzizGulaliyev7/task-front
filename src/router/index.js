import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts/index'

Vue.use(VueRouter)

var routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name: 'login',
  },
  {
    path: '/',
    component: Layout,
    redirect: '/',
    children: [{
        path: '/',
        component: () =>
            import ('@/views/HomeView'),
        name: 'home',
        meta: { title: 'Home page' }
    }]
},
]

/**
 * Load all routes from modules folder.
 */
 const request = require.context('./modules', true, /.js/);

 request.keys().map(module => {
     routes = routes.concat(request(module).default);
 });

 const router = new VueRouter({
     routes: routes,
     mode: "history"
  })
 
 export default router;
