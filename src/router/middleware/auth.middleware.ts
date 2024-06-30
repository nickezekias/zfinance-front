import { useAuthStore } from '@/stores/auth.store'

export default async function auth({ to, next }: any) {
  const authStore = useAuthStore()
  const loginQuery = { path: '/login', query: { redirect: to.fullPath } }
  if (authStore.isGuest()) {
    authStore.clearAuthenticatedUser()
    next(loginQuery)
  } else {
    if (authStore.user) {
      next()
    } else {
      try {
        await authStore.getAuthenticatedUser()
      } catch(e) {
        console.error(e)
      }
      if (authStore.user) {
        next()
      } else {
        next(loginQuery)
      }
    }
  }

}
