import { createRouter, createWebHistory } from 'vue-router'
import GuestLayout from '@/layouts/GuestLayout.vue'
import middlewarePipeline from './middleware/middlewarePipeline';
import guest from './middleware/guest.middleware';
import auth from './middleware/auth.middleware';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: GuestLayout,
      redirect: { name: 'auth.login' },
      meta: { middleware: [guest] },
      children: [
        {
          path: 'forgot-password',
          name: 'auth.forgotPassword',
          meta: { middleware: [guest] },
          component: () => import ('@/app/features/auth/ForgotPasswordView.vue')
        },
        {
          path: 'login',
          name: 'auth.login',
          meta: { middleware: [guest] },
          component: () => import('@/app/features/auth/login/presentation/IndexView.vue')
        },
        {
          path: 'register',
          name: 'auth.register',
          meta: { middleware: [guest] },
          component: () => import('@/app/features/auth/register/presentation/IndexView.vue')
        }
      ]
    },
    {
      path: '/',
      component: () => import('@/layouts/AppLayout.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: { middleware: [auth] },
          component: () => import('@/app/features/dashboard/presentation/IndexView.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const middleware: Array<Function> = to.meta.middleware as Array<Function>;
  const context = { to, from, next };

  if (!middleware) {
    return next();
  }

  await middleware[0]({
    ...context,
    next: await middlewarePipeline(context, middleware, 1),
  });
})

export default router
