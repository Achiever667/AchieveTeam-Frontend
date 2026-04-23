import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/auth/login' },
    ...routes,
  ],
})

export default router