import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/IndexView.vue')
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('@/views/result/IndexView.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('@/views/create/IndexView.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      props: true,
      component: () => import('@/views/detail/IndexView.vue')
    }
  ]
})

export default router
