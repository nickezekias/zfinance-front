import { useAuthStore } from "@/stores/auth.store";

export default async function guest({ next }: any) {
  const authStore = useAuthStore()
  if (authStore.isGuest() && !authStore.user) {
    await authStore.getAuthenticatedUser()
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