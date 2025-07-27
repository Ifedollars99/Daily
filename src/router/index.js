import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/first',
    component: () => import('../views/AddTaskModal.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
