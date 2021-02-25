import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Configuration from '../views/Configuration.vue'
import StartLine from '../views/StartLine.vue'
import RaceCourse from '../views/Racing.vue'
import NotFound from '../views/NotFound.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/configuration',
    name: 'Configuration',
    component: Configuration
  },
  {
    path: '/start',
    name: 'Starting',
    component: StartLine
  },
  {
    path: '/race',
    name: 'Racing',
    component: RaceCourse
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
    
  },
    // 404
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
