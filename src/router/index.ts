import { createRouter, createWebHistory } from 'vue-router'
import GuestLayout from '@/layouts/GuestLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: GuestLayout,
      redirect: { name: 'login' },
      children: [
        {
          path: 'forgot-password',
          name: 'forgotPassword',
          component: () => import ('@/app/features/auth/ForgotPasswordView.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/app/features/auth/login/presentation/IndexView.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/app/features/auth/register/presentation/IndexView.vue')
        }
      ]
    }
  ]
})

export default router
