import { useAuthStore } from '@/stores/auth.store'

export default async function auth({ to, next }: any) {
  const authStore = useAuthStore()
  const loginQuery = { path: '/login', query: { redirect: to.fullPath } }
  if (!authStore.user) {
    await authStore.getAuthenticatedUser()
    if (!authStore.user) {
      next(loginQuery)
    } else {
      next()
    }
  } else {
    next()
  }
}
