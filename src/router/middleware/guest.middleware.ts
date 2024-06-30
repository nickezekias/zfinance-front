import { useAuthStore } from "@/stores/auth.store";

export default async function guest({ next }: any) {
  const authStore = useAuthStore()
  if (!authStore.isGuest() && !authStore.user) {
    try {
      await authStore.getAuthenticatedUser()
    } catch(e) {
      console.error(e)
    }
    if (authStore.user) {
      next({ name: 'dashboard' })
    } else {
      authStore.clearAuthenticatedUser()
      next()
    }
  } else {
    next();
  }
}