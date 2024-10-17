import { useAdminAuthStore } from "@/stores/admin.auth.store";

export default async function admin({ to, next }: any) {
  const authStore = useAdminAuthStore()
  const loginQuery = { path: '/admin/login', query: { redirect: to.fullPath } }
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