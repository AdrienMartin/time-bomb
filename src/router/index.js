import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import( '../pages/Home.vue')
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import( '../pages/Game.vue'),
    props: (route) => ({
      ...route.params
    })
  },
  {
    path: '/endGame',
    name: 'EndGame',
    component: () => import( '../pages/EndGame.vue'),
    props: (route) => ({
      ...route.params
    })
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
